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
import { useComponentTransactionState } from "../hooks/useComponentTransactionState";

// Create a unique ID for each transaction component instance
const generateUniqueId = () => `tx_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

export const BuyPropertyTx: FC<{ data: any }> = ({ data }) => {
  console.log(data);
  
  // Use component-level transaction state instead of local useState
  const { 
    txConfirmed, setTxConfirmed,
    txHash, setTxHash,
    success, setSuccess,
    error, setError
  } = useComponentTransactionState();
  
  // Unique ID for this component instance
  const [componentId] = useState(() => generateUniqueId());
  const [isLoading, setIsLoading] = useState(false);
  const { create } = useTransactionExecuter();
  const [expiration, setExpiration] = useState(0);
  // Still get the global transaction state for compatibility
  const globalTxState = useTransactionOverviewJotai();
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
  setIsLoading(true);
  const isXWallet = await client.getCode({
    address: data.address as `0x${string}`,
    blockTag: "latest",
  });

  if (isXWallet) {
    try {
      const price = await client.readContract({
        address: OCLR_ADDRESS[ChainId.base] as `0x${string}`,
        abi: BASE_OCLR_Abi,
        functionName: 'getPropertyPriceWithFees',
        args: [
          MARKETPLACE_ADDRESS[ChainId.base] as `0x${string}`,
          USDC_ADDRESS[ChainId.base] as `0x${string}`,
          data.property.contractAddress as `0x${string}`,
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
            to: data.property.contractAddress as `0x${string}`,
            isFeeInXeq: false,
            recipient: data.address as `0x${string}`,
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
        onSuccess: (hash) => {
          setTxHash(hash);
          setTxConfirmed(true);
          setSuccess(true);
          globalTxState.setTxHash(hash);
          setIsLoading(false);
        }})
    } catch (err: any) {
      console.error("Transaction failed:", err);
      setError(err?.message || "Transaction failed");
      setIsLoading(false);
    }
  } else {
    console.error("Web3 EOA not implemented");
    setError("Web3 EOA not implemented");
    setIsLoading(false); 
  }
};

  return (
    <div className="mt-2 mb-2 p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-800" data-component-id={componentId}>
      <div className="font-medium">Buy Property Confirmation</div>
      <div className="text-sm mt-1">
        <div>Property: {data.property.title}</div>
        <div>Property tokens: {data.noOfPropertyTokens}</div>
        <div>Investment amount: {data.investmentAmount}</div>
      </div>
      <div className="mt-3">
        {error ? (
          <div className="text-red-600 dark:text-red-400">
            Error: {error}
          </div>
        ) : txConfirmed ? (
          <div className="text-green-600 dark:text-green-400">
            Successfully Bought the Property tokens:{" "}
            <a
              target="_blank"
              href={`https://basescan.org/tx/${txHash}`}
              className="text-blue-600 dark:text-blue-400 underline"
            >
              View Transaction
            </a>
          </div>
        ) : !success ? (
          <button
            onClick={handleClick}
            className={"font-bold py-2 px-4 rounded flex items-center bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"
                />
              </svg>
            ) : null}
            <span>{isLoading ? "Processing..." : "Confirm Transaction"}</span>
          </button>
        ) : (
          <div className="text-green-600 dark:text-green-400">
            Successfully Bought the Property tokens:{" "}
            <a
              target="_blank"
              href={`https://basescan.org/tx/${txHash}`}
              className="text-blue-600 dark:text-blue-400 underline"
            >
              View Transaction
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
