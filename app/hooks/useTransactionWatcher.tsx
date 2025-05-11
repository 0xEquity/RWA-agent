import { useContext, useCallback } from "react";
import {
  BaseError,
  ContractFunctionRevertedError,
  CallExecutionError,
  ContractFunctionExecutionError,
  TransactionType,
} from "viem";

import { usePublicClient } from "wagmi";
import { MERKLE_HASH } from "../constants";
import { useWalletJotai } from "../atoms/wallet.jotai";
import { PassKeyKeyPair } from "../passkey/WebAuthnWrapper";
import { AppContext } from "../providers/AppContex";
import { ChainId } from "../sdk/ChainId";
import { PasskeyWallet } from "../passkey/PasskeyWallet";
import { useTransactionOverviewJotai } from "../atoms/transactionoverview.jotai";
import { useStepJotai } from "../atoms/steps.jotai";
import { useRegisterJotai } from "../atoms/register.jotai";
import { useXWalletContext } from "../providers/XWalletContext";

interface Props {
  expiration: number;
  nonce: number;
  callData: `0x${string}`[];
  txType: TransactionType;

  xWalletAddress?: string;
  root?: string;
}
export const useTransactionExecuter = () => {
  const publicClient = usePublicClient();
  const {
    walletAddress: userXWalletAddress,
    walletType,
    walletWeb3Address,
    passKeys,
  } = useWalletJotai();
  const { addStep } = useStepJotai();

  const {
    setTxSend,
    setTxConfirmed,
    setTxHash,
    setErrorMessage,
    setSuccessMessage,
    setStep,
  } = useTransactionOverviewJotai();
  const waw = useContext(AppContext);
  const walletContext = useXWalletContext();

  const create = useCallback(
    async ({ expiration, nonce, callData, root }: Props) => {
      try {
        try {
          const passKey = PassKeyKeyPair.revivePassKeyPair(
            {
              keyId: passKeys[0].keyId,
              pubKeyX: passKeys[0].pubKeyX,
              pubKeyY: passKeys[0].pubKeyY,
              waw,
              name: passKeys[0].name,
              aaguid: passKeys[0].aaguid,
              manufacturer: passKeys[0].manufacturer,
              regTime: passKeys[0].regTime,
            },
            waw
          );

          let result = await PasskeyWallet.deployAndCallOrSendOnly({
            chain_id: ChainId.base,
            client: publicClient!,
            credential_id: passKey.keyId,
            pubKeyX: passKey.pubKeyX._hex,
            pubKeyY: passKey.pubKeyY._hex,
            expiration,
            nonce,
            transactions: callData,
            value: 0,
            wallet_address: userXWalletAddress,
            recovery_merkle_hash: root || MERKLE_HASH,
            email: walletContext.email as `0x${string}`,
            callBack(action, status) {
              if (status) {
                addStep({ status: "Confirmed", title: action });
              } else {
                addStep({ status: "Error", title: action });
              }
            },
            passKey,
            walletType: walletType,
            web3WalletAddress: walletWeb3Address,
          });
          setStep(3);
          watcher(result, ChainId.base);
        } catch (error) {
          parseError(error);
        }
        return;
      } catch (error: any) {
        parseError(error);
      }
    },
    []
  );

  const watcher = useCallback(async (result: any, chain_id: number) => {
    if (result && (result as any).tx_hash) {
      const txHash = (result as any).tx_hash;

      setTxSend(true);
      setTxHash(txHash);
      const txResult = await publicClient!.waitForTransactionReceipt({
        hash: txHash as `0x${string}`,
      });

      if (txResult.status === "success") {
        setTxConfirmed(true);
        setSuccessMessage("Swapped Successfully");
        setStep(4);
      } else {
        addStep({ status: "Error", title: "Transaction Failed" });

        setErrorMessage("Tx Failed");
      }

      return txHash;
    } else {
      throw new Error("Transaction hash not found or invalid format");
    }
  }, []);

  const parseError = (error: any) => {
    console.log(error, "-=-=-=-=-=-=");
    if (error instanceof BaseError) {
      const revertError = error.walk(
        (err) =>
          err instanceof ContractFunctionRevertedError ||
          err instanceof CallExecutionError ||
          err instanceof ContractFunctionExecutionError
      );

      console.log({ revertError });
      if (revertError instanceof ContractFunctionRevertedError) {
        setErrorMessage(revertError?.shortMessage);
      }
      if (revertError instanceof ContractFunctionExecutionError) {
        setErrorMessage(revertError?.shortMessage);
      }
      if (revertError instanceof CallExecutionError) {
        setErrorMessage(revertError?.shortMessage);
      }
      setErrorMessage(JSON.stringify(error));

      return;
    } else if (error && error.message) {
      console.log("i get here2");
      setErrorMessage(error.message);

      return;
    }
    console.log("i get here3");
    throw new Error("Error in transaction");
  };
  return { create, watcher };
};
