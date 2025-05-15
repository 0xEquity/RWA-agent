import { FC, useMemo, useState } from "react";
import {
  useWriteRentPositionAutomaterCreatePosition,
  useWriteRentShareDelegateRent,
} from "../generated";
import {
  RENT_AUTOMATER_DELEGATEE,
  RENT_SHARE_ADDRESS,
  RENTPOSITION_AUTOMATER,
  USDC_ADDRESS,
  WXRWA1_ADDRESS,
} from "../constants";
import { base } from "viem/chains";
import { encodeAbiParameters, encodeFunctionData } from "viem";
import { usePublicClient } from "wagmi";
import { RentShare_Abi } from "../abi/RentShare_Abi";
import { RENT_POSITION_AUTOMATER_Abi } from "../abi/RentPositionAutomater_Abi";
import { useTransactionExecuter } from "../hooks/useTransactionWatcher";
import { TransactionType } from "../types/TransactionTypes";
import { useTransactionOverviewJotai } from "../atoms/transactionoverview.jotai";
import { useComponentTransactionState } from "../hooks/useComponentTransactionState";

// Create a unique ID for each transaction component instance
const generateUniqueId = () => `tx_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

export const AutomateRentTx: FC<{ data: any }> = ({ data }) => {
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

  // Still get the global transaction state for compatibility
  const { writeContractAsync: delegateRentAsync } =
    useWriteRentShareDelegateRent();
  const { create } = useTransactionExecuter();
  const [expiration, setExpiration] = useState(0);
  const globalTxState = useTransactionOverviewJotai();
  const [nonce, setNonce] = useState(0);
  
  useMemo(() => {
    if (nonce === 0 && expiration === 0) {
      setNonce(Math.floor(Date.now() / 1000) * 10);
      setExpiration(Date.now() + 86400);
    }
  }, [nonce, expiration]);
  
  const { writeContractAsync: createRentAutomationPositionAsync } =
    useWriteRentPositionAutomaterCreatePosition();

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
      try {
        const delegateRentCallData = encodeFunctionData({
          abi: RentShare_Abi,
          functionName: "delegateRent",
          args: [RENT_AUTOMATER_DELEGATEE[base.id] as `0x${string}`],
        });
        let approveTransactionTX = encodeAbiParameters(
          [{ type: "address" }, { type: "uint256" }, { type: "bytes" }],
          [RENT_SHARE_ADDRESS[base.id] as `0x${string}`, 0n, delegateRentCallData]
        );

        const createPositionCallData = encodeFunctionData({
          abi: RENT_POSITION_AUTOMATER_Abi,
          functionName: "createPosition",
          args: [
            {
              automateRewards: true,
              noOfPropertyTokens: BigInt(data.propertyTokens),
              propertyTokenAddress: WXRWA1_ADDRESS[base.id] as `0x${string}`,
              rewardBehavior: {
                harvestTokenOut: USDC_ADDRESS[base.id] as `0x${string}`,
                rewardrecipient: data.address as `0x${string}`,
                rewardBehavior: (data.strategy),
              },
            },
          ],
        });
        let createPositionTX = encodeAbiParameters(
          [{ type: "address" }, { type: "uint256" }, { type: "bytes" }],
          [
            RENTPOSITION_AUTOMATER[base.id] as `0x${string}`,
            0n,
            createPositionCallData,
          ]
        );
          create({
          nonce,
          expiration,
          callData: [approveTransactionTX, createPositionTX],
          txType: TransactionType.RENT_REDEEM,
          onSuccess: (hash) => {
            // Update this component's transaction state
            setTxHash(hash);
            setTxConfirmed(true); 
            setSuccess(true);
            
            // Still update global state for compatibility
            globalTxState.setTxHash(hash);
          }
        });
      } catch (err: any) {
        console.error("Transaction failed:", err);
        setError(err?.message || "Transaction failed");
      }
    } else {
      try {
        const tx = await delegateRentAsync({
          address: RENT_SHARE_ADDRESS[base.id] as `0x${string}`,
          args: [RENT_AUTOMATER_DELEGATEE[base.id] as `0x${string}`],
        });
        
        setTxHash(tx);
        globalTxState.setTxHash(tx); // Still update global state for compatibility
        
        let confirmation = await client.waitForTransactionReceipt({ hash: tx });
        
        if (confirmation.status) {
          const automateTx = await createRentAutomationPositionAsync({
            address: RENTPOSITION_AUTOMATER[base.id] as `0x${string}`,
            args: [
              {
                automateRewards: true,
                noOfPropertyTokens: BigInt(data.propertyTokens),
                propertyTokenAddress: WXRWA1_ADDRESS[base.id] as `0x${string}`,
                rewardBehavior: {
                  harvestTokenOut: USDC_ADDRESS[base.id] as `0x${string}`,
                  rewardrecipient: data.address as `0x${string}`,
                  rewardBehavior: data.strategy,
                },
              },
            ],
          });
          
          confirmation = await client.waitForTransactionReceipt({
            hash: automateTx,
          });
          
          setTxHash(automateTx);
          globalTxState.setTxHash(automateTx); // Still update global state for compatibility
          setTxConfirmed(true);
          setSuccess(true);
        }
      } catch (err: any) {
        console.error("Transaction failed:", err);
        setError(err?.message || "Transaction failed");
      }
    }
  };
  
  return (
    <div className="mt-2 mb-2 p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-800" data-component-id={componentId}>
      <div className="font-medium">Yield Automation Strategy</div>
      <div className="text-sm mt-1">
        <div>Property tokens: {data.propertyTokens}</div>
        <div>Minimum USDC: {data.minUSDC}</div>
        <div>Max USDC: {data.maxUSDC}</div>
      </div>
      <div className="mt-3">
        {error ? (
          <div className="text-red-600 dark:text-red-400">
            Error: {error}
          </div>
        ) : txConfirmed ? (
          <div className="text-green-600 dark:text-green-400">
            Successfully Activated{' '}
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
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <span>Confirm Transaction</span>
          </button>
        ) : (
          <div className="text-green-600 dark:text-green-400">
            Successfully Activated{' '}
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
