import { atom, useAtom } from "jotai";

export type ActionStatus =
  | "Pending"
  | "Confirmed"
  | "Requesting"
  | "Validating..."
  | "Valid"
  | "Error"
  | "Skip";

export const stepsStatusAtom = atom<{ status: ActionStatus; title: string }[]>(
  [],
);
// Atom to update the list of steps
const addStepAtom = atom<
  undefined,
  { status: ActionStatus; title: string }[],
  void
>(
  undefined, // read function not needed for this atom
  (get, set, newStep) => {
    const currentSteps = get(stepsStatusAtom);

    set(stepsStatusAtom, [...currentSteps, newStep]);
  },
);
const resetStepsAtom = atom(
  null, // read function not needed for this atom
  (_, set) => {
    set(stepsStatusAtom, []); // Resetting the steps list
  },
);

export const useStepJotai = () => {
  const [stepsStatus, setStepsStatus] = useAtom(stepsStatusAtom);
  const [, addStep] = useAtom(addStepAtom);
  const [, resetSteps] = useAtom(resetStepsAtom);

  return {
    stepsStatus,
    addStep,
    resetSteps,
    setStepsStatus,
  };
};
