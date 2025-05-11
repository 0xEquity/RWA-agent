import {
  PublicClient,
  encodeAbiParameters,
  encodeFunctionData,
  getContract,
  keccak256,
  toHex,
} from "viem";
import { arrayify } from "ethers/lib/utils";
import { toBase64url } from "@passwordless-id/webauthn/dist/esm/utils";

import { Passkey_Factory_ABI } from "../abi/Passkey_Factory_Abi";
import { OCLR_Abi } from "../abi/OCLR_Abi";

import { RelayerAPI } from "./Relayer";

import { PassKeyKeyPair } from "./WebAuthnWrapper";
import { ChainId, NetworkId } from "../sdk/ChainId";
import {
  OCLR_ADDRESS,
  PASSKEYS_ACCOUNT_IMP,
  PASSKEYS_FACTORY_ADDRESS,
  RECOVERY_MODULE,
} from "../constants";
import { getSignature } from "./utils/parseSignature";
import { FixBigNumber } from "../sdk/FixBigNumber";
interface SignProps {
  callData: `0x${string}`;
  chain_id: NetworkId;
  credential_id: string;
  passKey: PassKeyKeyPair;
}
interface CreateAccountPayload {
  email: string;
  nonce: number;
  expiration: number;
  pubKeyX: string;
  pubKeyY: string;
  chain_id: NetworkId;
  credential_id: string;
  passKey: PassKeyKeyPair;
  recovery_merkle_hash: string;
  walletType: Number;
  web3WalletAddress: string;
}
interface DeployAndCallProps {
  email: string;
  nonce: number;
  expiration: number;
  pubKeyX: string;
  pubKeyY: string;
  chain_id: NetworkId;
  credential_id: string;
  client: PublicClient;
  transactions: `0x${string}`[];
  recovery_merkle_hash: string;
  value: number;
  callBack: (action: CALLBACK_ACTION, status: boolean) => void;
  passKey: PassKeyKeyPair;
  walletType: number;
  web3WalletAddress: string;
}
interface SendBatchTranstionProps {
  nonce: number;
  expiration: number;
  wallet_address: string;
  chain_id: NetworkId;
  credential_id: string;
  client: PublicClient;
  transactions: `0x${string}`[];
  value: number;
  callBack: (action: CALLBACK_ACTION, status: boolean) => void;
  passKey: PassKeyKeyPair;
}
export enum CALLBACK_ACTION {
  ACCOUNT_CREATE_PAYLOAD = "Create Account Payload",
  ACCOUNT_CREATE_SIGN = "Sign Account Create Request",
  ACCOUNT_CREATE_EST = "Validate Account Creation Reqeust",
  TRANSACTION_SIGN = "Sign Transaction",
  TRANSACTION_PAYLOAD = "Create Transaction Payload",
  TRANSACTION_EST = "Validate Transaction Request",
  SEND = "Send",
}

export class PasskeyWallet {
  static async createAccountPayload({
    email,
    nonce,
    expiration,
    pubKeyX,
    pubKeyY,
    chain_id,
    recovery_merkle_hash,
    credential_id,
    passKey,
    web3WalletAddress,
    walletType,
  }: CreateAccountPayload) {
    const emailHash = keccak256(toHex(email));
    const walletAbi = [
      {
        name: "nonce",
        type: "uint256",
      },
      {
        name: "deadline",
        type: "uint256",
      },
      {
        name: "emailHash",
        type: "bytes",
      },
      {
        components: [
          {
            name: "pubKeyX",
            type: "uint256",
          },
          {
            name: "pubKeyY",
            type: "uint256",
          },
          {
            name: "keyHash",
            type: "string",
          },
        ],
        name: "PassKeyArs",
        type: "tuple",
      },
      {
        name: "ecdsaSigner",
        type: "address",
      },
      {
        name: "recoveryEmailsMerkleRoot",
        type: "bytes32",
      },
      {
        name: "totalRecoveryEmails",
        type: "uint256",
      },
      {
        name: "recoveryImplementation",
        type: "address",
      },
      {
        name: "accountImplementationAddr",
        type: "address",
      },
    ] as const;
    let createWalletPayload = encodeAbiParameters(walletAbi, [
      BigInt(nonce),
      BigInt(expiration),
      emailHash,
      {
        pubKeyX: BigInt(pubKeyX),
        pubKeyY: BigInt(pubKeyY),
        keyHash: credential_id as `0x${string}`,
      },
      walletType === 3
        ? (web3WalletAddress as `0x${string}`)
        : ("0x0000000000000000000000000000000000000000" as `0x${string}`),
      recovery_merkle_hash as `0x${string}`,
      3n,
      RECOVERY_MODULE[chain_id] as `0x${string}`,
      PASSKEYS_ACCOUNT_IMP[chain_id] as `0x${string}`,
    ]);

    return PasskeyWallet.signData({
      callData: createWalletPayload,
      chain_id: chain_id,
      credential_id: credential_id,
      passKey,
    });
  }
  static async deployAndCallOrSendOnly({
    email,
    nonce,
    expiration,
    pubKeyX,
    pubKeyY,
    chain_id,
    credential_id,
    client,
    transactions,
    wallet_address,
    recovery_merkle_hash,
    value = 0,
    callBack,
    passKey,
    walletType,
    web3WalletAddress,
  }: DeployAndCallProps & {
    wallet_address: string;
  }) {
    const isContractDeployed = await client.getBytecode({
      address: wallet_address as `0x${string}`,
      blockTag: "latest",
    });

    if (isContractDeployed) {
      return PasskeyWallet.sendTransaction({
        chain_id,
        nonce,
        expiration,
        client,
        credential_id,
        transactions,
        value,
        wallet_address,
        callBack,
        passKey,
      });
    }

    const emailHash = keccak256(toHex(email));

    callBack(CALLBACK_ACTION.ACCOUNT_CREATE_PAYLOAD, true);

    const passKeySignature = await PasskeyWallet.createAccountPayload({
      email: email,
      chain_id: chain_id,
      credential_id: credential_id,
      expiration: expiration,
      nonce: nonce,
      pubKeyX: pubKeyX,
      pubKeyY: pubKeyY,
      passKey,
      recovery_merkle_hash,
      walletType,
      web3WalletAddress,
    });

    callBack(CALLBACK_ACTION.ACCOUNT_CREATE_SIGN, true);

    let batchCallData = encodeAbiParameters(
      [{ type: "uint256" }, { type: "uint256" }, { type: "bytes[]" }] as const,
      [BigInt(nonce), BigInt(expiration), transactions]
    );

    callBack(CALLBACK_ACTION.TRANSACTION_PAYLOAD, true);
    const passKeySignature2 = await PasskeyWallet.signData({
      callData: batchCallData,
      chain_id: chain_id,
      credential_id: credential_id,
      passKey,
    });

    callBack(CALLBACK_ACTION.TRANSACTION_SIGN, true);
    const passKeyContractInstance = getContract({
      address: PASSKEYS_FACTORY_ADDRESS[chain_id] as `0x${string}`,
      abi: Passkey_Factory_ABI,
      client: client,
    });

    const est = await passKeyContractInstance.estimateGas.createAccountAndCall(
      [
        {
          emailHash: emailHash,
          passkeyId: {
            keyId: credential_id as `0x${string}`,
            pubKeyX: BigInt(pubKeyX),
            pubKeyY: BigInt(pubKeyY),
          },
          nonce: BigInt(nonce),
          deadline: BigInt(expiration),
          ecdsaSigner:
            "0x0000000000000000000000000000000000000000" as `0x${string}`,
          recoveryImplementation: RECOVERY_MODULE[chain_id] as `0x${string}`,
          recoveryEmailsMerkleRoot: recovery_merkle_hash as `0x${string}`,
          accountImplementationAddr: PASSKEYS_ACCOUNT_IMP[
            chain_id
          ] as `0x${string}`,
          totalRecoveryEmails: 3n,
          signatures: {
            passKeySignature: passKeySignature as `0x${string}`,
            ecdsaSignature: "0x0000000000000000000000000000000000000000",
          },
        },
        {
          txns: transactions,
          passkeySignature: passKeySignature2,
          ecdsaSignature: "0x0000000000000000000000000000000000000000",
        },
      ],
      {}
    );

    callBack(CALLBACK_ACTION.ACCOUNT_CREATE_EST, true);

    const encodeData = encodeFunctionData({
      abi: Passkey_Factory_ABI,
      functionName: "createAccountAndCall",
      args: [
        {
          emailHash,
          passkeyId: {
            keyId: credential_id as `0x${string}`,
            pubKeyX: BigInt(pubKeyX),
            pubKeyY: BigInt(pubKeyY),
          },
          nonce: BigInt(nonce),
          deadline: BigInt(expiration),
          ecdsaSigner:
            "0x0000000000000000000000000000000000000000" as `0x${string}`,
          recoveryImplementation: RECOVERY_MODULE[chain_id] as `0x${string}`,
          recoveryEmailsMerkleRoot: recovery_merkle_hash as `0x${string}`,
          accountImplementationAddr: PASSKEYS_ACCOUNT_IMP[
            chain_id
          ] as `0x${string}`,
          totalRecoveryEmails: 3n,
          signatures: {
            passKeySignature: passKeySignature as `0x${string}`,
            ecdsaSignature: "0x0000000000000000000000000000000000000000",
          },
        },
        {
          txns: transactions,
          passkeySignature: passKeySignature2,
          ecdsaSignature: "0x0000000000000000000000000000000000000000",
        },
      ],
    });

    if (est > 0n) {
      callBack(CALLBACK_ACTION.SEND, true);

      return RelayerAPI({
        to: PASSKEYS_FACTORY_ADDRESS[chain_id],
        data: encodeData,
        value: value,
        chain_id,
        gas_limit: parseInt(
          (chain_id === 88811
            ? FixBigNumber.fromWei(est.toString())
                .multiply(FixBigNumber.toWei(1.5, 9))
                .toFormat()
            : chain_id === ChainId.base
              ? FixBigNumber.fromWei(est.toString())
                  .multiply(FixBigNumber.toWei(1.3, 9))
                  .toFormat()
              : est
          ).toString()
        ),
      });
    } else {
      callBack(CALLBACK_ACTION.ACCOUNT_CREATE_EST, false);
    }
  }

  static async deployOnly({
    email,
    nonce,
    expiration,
    recovery_merkle_hash,
    pubKeyX,
    pubKeyY,
    chain_id,
    credential_id,
    client,
    value = 0,
    callBack,
    passKey,
    walletType,
    web3WalletAddress,
  }: DeployAndCallProps & {
    wallet_address: string;
  }) {
    const emailHash = keccak256(toHex(email));

    callBack(CALLBACK_ACTION.ACCOUNT_CREATE_PAYLOAD, true);

    const passKeySignature = await PasskeyWallet.createAccountPayload({
      email: email,
      chain_id: chain_id,
      credential_id: credential_id,
      expiration: expiration,
      nonce: nonce,
      pubKeyX: pubKeyX,
      pubKeyY: pubKeyY,
      recovery_merkle_hash,
      passKey,
      walletType,
      web3WalletAddress,
    });

    callBack(CALLBACK_ACTION.ACCOUNT_CREATE_SIGN, true);

    const passKeyContractInstance = getContract({
      address: PASSKEYS_FACTORY_ADDRESS[chain_id] as `0x${string}`,
      abi: Passkey_Factory_ABI,
      client: client,
    });

    const est = await passKeyContractInstance.estimateGas.createAccount(
      [
        {
          emailHash,
          passkeyId: {
            keyId: credential_id as `0x${string}`,
            pubKeyX: BigInt(pubKeyX),
            pubKeyY: BigInt(pubKeyY),
          },
          nonce: BigInt(nonce),
          deadline: BigInt(expiration),
          ecdsaSigner:
            "0x0000000000000000000000000000000000000000" as `0x${string}`,
          recoveryImplementation: RECOVERY_MODULE[chain_id] as `0x${string}`,
          recoveryEmailsMerkleRoot: recovery_merkle_hash as `0x${string}`,
          accountImplementationAddr: PASSKEYS_ACCOUNT_IMP[
            chain_id
          ] as `0x${string}`,
          totalRecoveryEmails: 3n,
          signatures: {
            passKeySignature: passKeySignature as `0x${string}`,
            ecdsaSignature: "0x0000000000000000000000000000000000000000",
          },
        },
      ],
      {}
    );

    callBack(CALLBACK_ACTION.ACCOUNT_CREATE_EST, true);

    const encodeData = encodeFunctionData({
      abi: Passkey_Factory_ABI,
      functionName: "createAccount",
      args: [
        {
          emailHash,
          passkeyId: {
            keyId: credential_id as `0x${string}`,
            pubKeyX: BigInt(pubKeyX),
            pubKeyY: BigInt(pubKeyY),
          },
          nonce: BigInt(nonce),
          deadline: BigInt(expiration),
          ecdsaSigner:
            "0x0000000000000000000000000000000000000000" as `0x${string}`,
          recoveryImplementation: RECOVERY_MODULE[chain_id] as `0x${string}`,
          recoveryEmailsMerkleRoot: recovery_merkle_hash as `0x${string}`,
          accountImplementationAddr: PASSKEYS_ACCOUNT_IMP[
            chain_id
          ] as `0x${string}`,
          totalRecoveryEmails: 3n,
          signatures: {
            passKeySignature: passKeySignature as `0x${string}`,
            ecdsaSignature: "0x0000000000000000000000000000000000000000",
          },
        },
      ],
    });

    if (est > 0n) {
      callBack(CALLBACK_ACTION.SEND, true);

      return RelayerAPI({
        to: PASSKEYS_FACTORY_ADDRESS[chain_id],
        data: encodeData,
        value: value,
        chain_id,
        gas_limit: parseInt(
          (chain_id === 88811
            ? FixBigNumber.fromWei(est.toString())
                .multiply(FixBigNumber.toWei(1.5, 9))
                .toFormat()
            : chain_id === ChainId.base
              ? FixBigNumber.fromWei(est.toString())
                  .multiply(FixBigNumber.toWei(1.3, 9))
                  .toFormat()
              : est
          ).toString()
        ),
      });
    } else {
      callBack(CALLBACK_ACTION.ACCOUNT_CREATE_EST, false);
    }
  }

  static async sendTransaction({
    nonce,
    expiration,
    wallet_address,
    chain_id,
    credential_id,
    client,
    transactions,
    value = 0,
    callBack,
    passKey,
  }: SendBatchTranstionProps) {
    let batchCallData = encodeAbiParameters(
      [{ type: "uint256" }, { type: "uint256" }, { type: "bytes[]" }] as const,
      [BigInt(nonce), BigInt(expiration), transactions]
    );

    callBack(CALLBACK_ACTION.TRANSACTION_PAYLOAD, true);

    const passKeySignature = await PasskeyWallet.signData({
      callData: batchCallData,
      chain_id: chain_id,
      credential_id: credential_id,
      passKey,
    });

    callBack(CALLBACK_ACTION.TRANSACTION_SIGN, true);

    const oclrContractInstance = getContract({
      address: OCLR_ADDRESS[chain_id] as `0x${string}`,
      abi: OCLR_Abi,
      client: client,
    });
    const est =
      await oclrContractInstance.estimateGas.executeBatchPasskeyWallet(
        [
          wallet_address as `0x${string}`,
          transactions,
          BigInt(nonce),
          BigInt(expiration),
          passKeySignature as `0x${string}`,
          "0x0000000000000000000000000000000000000000",
        ],
        { account: wallet_address as `0x${string}` }
      );

    callBack(CALLBACK_ACTION.TRANSACTION_EST, true);

    const encodeData = encodeFunctionData({
      abi: OCLR_Abi,
      functionName: "executeBatchPasskeyWallet",
      args: [
        wallet_address as `0x${string}`,
        transactions,
        BigInt(nonce),
        BigInt(expiration),
        passKeySignature as `0x${string}`,
        "0x0000000000000000000000000000000000000000",
      ],
    });

    callBack(CALLBACK_ACTION.SEND, true);

    if (est > 0) {
      return RelayerAPI({
        to: OCLR_ADDRESS[chain_id],
        data: encodeData,
        chain_id,
        value: value,
        gas_limit: parseInt(
          (chain_id === 88811
            ? FixBigNumber.fromWei(est.toString())
                .multiply(FixBigNumber.toWei(1.5, 9))
                .toFormat()
            : chain_id === ChainId.base
              ? FixBigNumber.fromWei(est.toString())
                  .multiply(FixBigNumber.toWei(1.3, 9))
                  .toFormat()
              : est
          ).toString()
        ),
      });
    } else {
      callBack(CALLBACK_ACTION.TRANSACTION_EST, false);
    }
  }

  static async signData({
    callData,
    chain_id,
    credential_id,
    passKey,
  }: SignProps) {
    let encodeWithChainId = encodeAbiParameters(
      [{ type: "uint256" }, { type: "bytes32" }] as const,
      [BigInt(chain_id), keccak256(callData)]
    );
    const challenge = toBase64url(
      arrayify(keccak256(encodeWithChainId)) as any
    ).replace(/=/g, "");

    const sigResponse2 = await passKey.signChallenge(challenge);

    return getSignature(sigResponse2, challenge, credential_id);
  }
}
