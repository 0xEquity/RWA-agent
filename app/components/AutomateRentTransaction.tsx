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

export const AutomateRentTx: FC<{ data: any }> = ({ data }) => {
  console.log(data);
  const [success, setSuccess] = useState(false);
  const { writeContractAsync: delegateRentAsync } =
    useWriteRentShareDelegateRent();
  const { create } = useTransactionExecuter();
  const [expiration, setExpiration] = useState(0);
  const {isTxConfirmed, isTxHash, setTxHash} = useTransactionOverviewJotai()
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
              rewardBehavior: 1,
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
      });
    } else {
      const tx = await delegateRentAsync({
        address: RENT_SHARE_ADDRESS[base.id] as `0x${string}`,
        args: [RENT_AUTOMATER_DELEGATEE[base.id] as `0x${string}`],
      });
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
        setTxHash(automateTx)
        setSuccess(true);
      }
    }
  };
  return (
    <div>
      Yield Automation Strategy Property tokens: {data.propertyTokens} <br />
      Minimum USDC: {data.minUSDC} <br />
      Max USDC: {data.maxUSDC} <br />
      {isTxConfirmed? (
        <div>Successfully Activated{' '}
            <a target="_blank" href={`https://basescan.org/tx/${isTxHash}`}>Viex Tx</a>
        </div>
      ):!success ? (
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <span>Confirm Tx</span>
        </button>
      ) : (
        <div>Successfully Activated{' '}
            <a target="_blank" href={`https://basescan.org/tx/${isTxHash}`}>Viex Tx</a>
        </div>
      )}
    </div>
  );
};
