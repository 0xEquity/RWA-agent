import { atom, useAtom } from "jotai";
import { ACTION_SCREENS } from "../types/transaction.overview.types";

export const transactionActionAtom = atom<ACTION_SCREENS>(ACTION_SCREENS.SWAP);
const setTransactionActionAtom = atom<undefined, ACTION_SCREENS[], void>(
  undefined,
  (_get, set, update) => set(transactionActionAtom, update),
);

export const stepAtom = atom<number>(1);
const setStepAtom = atom<undefined, number[], void>(
  undefined,
  (_get, set, update) => set(stepAtom, update),
);

const isShowTransactionOverveiwModalAtom = atom(false);

const setIsShowTransactionOverveiwModalAtom = atom<undefined, boolean[], void>(
  undefined,
  (_get, set, update) => {
    if (update === true) {
      set(setStepAtom, 1);
      set(setTxApprovalAtom, false);
      set(setWalletUnlockAtom, false);
      set(setTxSendAtom, false);
      set(setTxValidatingAtom, false);
      set(isTxConfirmedAtom, false);
      set(isTxHashAtom, "");
      set(txErrorMessageAtom, "");
      set(txSuccessMessageAtom, "");
    }
    set(isShowTransactionOverveiwModalAtom, update);
  },
);

const isWalletUnlockAtom = atom(false);

const setWalletUnlockAtom = atom<undefined, boolean[], void>(
  undefined,
  (_get, set, update) => {
    set(isWalletUnlockAtom, update);
  },
);

const isTxApprovalAtom = atom(false);

const setTxApprovalAtom = atom<undefined, boolean[], void>(
  undefined,
  (_get, set, update) => {
    set(isTxApprovalAtom, update);
  },
);

const isTxValidatingAtom = atom(false);

const setTxValidatingAtom = atom<undefined, boolean[], void>(
  undefined,
  (_get, set, update) => {
    set(isTxValidatingAtom, update);
  },
);

const isTxSendAtom = atom(false);

const setTxSendAtom = atom<undefined, boolean[], void>(
  undefined,
  (_get, set, update) => {
    set(isTxSendAtom, update);
  },
);

const isTxConfirmedAtom = atom(false);

const setTxConfirmedAtom = atom<undefined, boolean[], void>(
  undefined,
  (_get, set, update) => {
    set(isTxConfirmedAtom, update);
  },
);

const isTxHashAtom = atom("");

const setTxHashAtom = atom<undefined, string[], void>(
  undefined,
  (_get, set, update) => {
    set(isTxHashAtom, update);
  },
);

const txErrorMessageAtom = atom("");

const setErrorMessageAtom = atom<undefined, string[], void>(
  undefined,
  (_get, set, update) => {
    set(txErrorMessageAtom, update);
  },
);

const txSuccessMessageAtom = atom("");

const setSuccessMessageAtom = atom<undefined, string[], void>(
  undefined,
  (_get, set, update) => {
    set(txSuccessMessageAtom, update);
  },
);

export const useTransactionOverviewJotai = () => {
  const [step] = useAtom(stepAtom);
  const [, setStep] = useAtom(setStepAtom);

  const [isShowTransactionOverveiwModal] = useAtom(
    isShowTransactionOverveiwModalAtom,
  );
  const [, setShowTransactionOverveiwModal] = useAtom(
    setIsShowTransactionOverveiwModalAtom,
  );
  const [isWalletUnlock] = useAtom(isWalletUnlockAtom);
  const [, setWalletUnlock] = useAtom(setWalletUnlockAtom);

  const [isTxApproval] = useAtom(isTxApprovalAtom);
  const [, setTxApproval] = useAtom(setTxApprovalAtom);

  const [isTxValidating] = useAtom(isTxValidatingAtom);
  const [, setTxValidating] = useAtom(setTxValidatingAtom);

  const [isTxConfirmed] = useAtom(isTxConfirmedAtom);
  const [, setTxConfirmed] = useAtom(setTxConfirmedAtom);

  const [isTxHash] = useAtom(isTxHashAtom);
  const [, setTxHash] = useAtom(setTxHashAtom);

  const [txErrorMessage] = useAtom(txErrorMessageAtom);
  const [, setErrorMessage] = useAtom(setErrorMessageAtom);

  const [txSuccessMessage] = useAtom(txSuccessMessageAtom);
  const [, setSuccessMessage] = useAtom(setSuccessMessageAtom);

  const [isTxSend] = useAtom(isTxSendAtom);
  const [, setTxSend] = useAtom(setTxSendAtom);


  const [transactionAction] = useAtom(transactionActionAtom);
  const [, setTransactionAction] = useAtom(setTransactionActionAtom);


  return {
    setTransactionAction,
    transactionAction,
    isTxConfirmed,
    setTxConfirmed,
    isTxHash,
    setTxHash,
    txErrorMessage,
    setErrorMessage,
    txSuccessMessage,
    setSuccessMessage,
    isWalletUnlock,
    setWalletUnlock,
    isTxApproval,
    setTxApproval,
    isTxValidating,
    setTxValidating,
    isTxSend,
    setTxSend,
    step,
    setStep,
    isShowTransactionOverveiwModal,
    setShowTransactionOverveiwModal,
  };
};
