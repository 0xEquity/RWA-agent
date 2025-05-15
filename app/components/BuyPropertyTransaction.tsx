import { FC, useMemo, useState } from "react";
import { useWriteRentShareDelegateRent } from "../generated";
import {
  MARKETPLACE_ADDRESS,
  OCLR_ADDRESS,
  USDC_ADDRESS,
  WXRWA1_ADDRESS,
} from "../constants";
import { encodeAbiParameters, encodeFunctionData, erc20Abi } from "viem";
import { usePublicClient } from "wagmi";
import { useTransactionExecuter } from "../hooks/useTransactionWatcher";
import { TransactionType } from "../types/TransactionTypes";
import { useTransactionOverviewJotai } from "../atoms/transactionoverview.jotai";
import { BASE_OCLR_Abi } from "../abi/BASE_OCLR_Abi";
import { ChainId } from "../sdk/ChainId";

export const BuyPropertyTx: FC<{ data: any }> = ({ data }) => {
  console.log(data);
  const [success] = useState(false);

  const { create } = useTransactionExecuter();
  const [expiration, setExpiration] = useState(0);
  const { isTxConfirmed, isTxHash, setTxHash } = useTransactionOverviewJotai();
  const [nonce, setNonce] = useState(0);
  useMemo(() => {
    if (nonce === 0 && expiration === 0) {
      setNonce(Math.floor(Date.now() / 1000) * 10);
      setExpiration(Date.now() + 86400);
    }
  }, [nonce, expiration]);

  const client = usePublicClient();
  const handleClick = async () => {
    if (!client) {
      return;
    }

    const isXWallet = await client.getCode({
      address: data.address as `0x${string}`,
      blockTag: "latest",
    });
    if (isXWallet) {
      const price = await client.readContract({
        address: OCLR_ADDRESS[ChainId.base] as `0x${string}`,
        abi: BASE_OCLR_Abi,
        functionName: 'getPropertyPriceWithFees',
        args: [
          MARKETPLACE_ADDRESS[ChainId.base] as `0x${string}`,
          USDC_ADDRESS[ChainId.base] as `0x${string}`,
          WXRWA1_ADDRESS[ChainId.base] as `0x${string}`,
          ["0x0000000000000000000000000000000000000000" as `0x${string}`],
          [BigInt(data.noOfPropertyTokens)],
        ],
      });
      const approveCallData = encodeFunctionData({
        abi: erc20Abi,
        functionName: "approve",
        args: [
          OCLR_ADDRESS[ChainId.base] as `0x${string}`,
          price,
        ],
      });
      let approveTransactionTX = encodeAbiParameters(
        [{ type: "address" }, { type: "uint256" }, { type: "bytes" }],
        [USDC_ADDRESS[ChainId.base] as `0x${string}`, 0n, approveCallData]
      );

      const buyPropertyCallData = encodeFunctionData({
        abi: BASE_OCLR_Abi,
        functionName: "buyProperty",
        args: [
          {
            from: USDC_ADDRESS[ChainId.base] as `0x${string}`,
            to: WXRWA1_ADDRESS[ChainId.base] as `0x${string}`,
            isFeeInXeq: false,
            recipient: data.walletAddress as `0x${string}`,
            vaults: [
              "0x0000000000000000000000000000000000000000",
            ] as `0x${string}`[],
            amounts: [BigInt(data.noOfPropertyTokens)],
            arbCallData: "0x" as `0x${string}`,
          },
          MARKETPLACE_ADDRESS[ChainId.base] as `0x${string}`,
        ],
      });
      let createPositionTX = encodeAbiParameters(
        [{ type: "address" }, { type: "uint256" }, { type: "bytes" }],
        [OCLR_ADDRESS[ChainId.base] as `0x${string}`, 0n, buyPropertyCallData]
      );
      create({
        nonce,
        expiration,
        callData: [approveTransactionTX, createPositionTX],
        txType: TransactionType.BUY_PROPERTY,
      });
    } else {
      throw new Error("Web3 EOA not implemented");
    }
  };
  return (
    <div>
      Buy Property Confirmation Property tokens: {data.property.tile} <br />
      No of Property tokens: {data.noOfPropertyTokens} <br />
      Investment amount: {data.investmentAmount} <br />

      {isTxConfirmed ? (
        <div>
          Successfully Bought the Propety tokens{" "}
          <a target="_blank" href={`https://basescan.org/tx/${isTxHash}`}>
            Viex Tx
          </a>
        </div>
      ) : !success ? (
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <span>Confirm Tx</span>
        </button>
      ) : (
        <div>
          Successfully Bought the Propety tokens{" "}
          <a target="_blank" href={`https://basescan.org/tx/${isTxHash}`}>
            Viex Tx
          </a>
        </div>
      )}
    </div>
  );
};
