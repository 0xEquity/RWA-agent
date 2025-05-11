import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const walletAtom = atom<string>("");
export const authCodeAtom = atom<string>("");


export const stepAtom = atom<number>(0);

export const userEmailAtom = atomWithStorage<string>(
  "0xequity/v3/signup/email",
  "",
);

export const userIdAtom = atomWithStorage<string>(
  "0xequity/v3/signup/id",
  "",
);

export const userPhoneNumberAtom = atom<string>("");
const signupTokenAtom = atomWithStorage<string>("0xequity/v3/signup/jwt", "");
const signupTraceAtom = atomWithStorage<string>(
  "0xequity/v3/signup/x-trace-id",
  "",
);

export const userTermsAcceptedAtom = atom<boolean>(false);

const setSignupTokenAtom = atom<undefined, string[], void>(
  undefined,
  (_get, set, update) => set(signupTokenAtom, update),
);
const setSignupTraceAtom = atom<undefined, string[], void>(
  undefined,
  (_get, set, update) => set(signupTraceAtom, update),
);
const setStepAtom = atom<undefined, number[], void>(
  undefined,
  (_get, set, update) => set(stepAtom, update),
);

const emailBounceAtom = atom<boolean>(false);
const setEmailBounceAtom = atom<undefined, boolean[], void>(
  undefined,
  (_get, set, update) => set(emailBounceAtom, update),
);

export const useRegisterJotai = () => {
  const [wallet, setWallet] = useAtom(walletAtom);
  const [authCode, setauthCode] = useAtom(authCodeAtom);


  const [userEmail, setUserEmail] = useAtom(userEmailAtom);
  const [userId, setUserId] = useAtom(userIdAtom);

  const [userPhoneNumber, setUserPhoneNumber] = useAtom(userPhoneNumberAtom);

  const [userTermsAccepted, setUserTermsAccepted] = useAtom(
    userTermsAcceptedAtom,
  );

  const [signupToken] = useAtom(signupTokenAtom);
  const [, setSignupToken] = useAtom(setSignupTokenAtom);

  const [traceId] = useAtom(signupTraceAtom);
  const [, setTraceId] = useAtom(setSignupTraceAtom);

  const [step] = useAtom(stepAtom);
  const [, setStep] = useAtom(setStepAtom);

  const [emailBounce] = useAtom(emailBounceAtom);
  const [, setEmailBounce] = useAtom(setEmailBounceAtom);

  return {
    wallet,
    step,
    setStep,
    setauthCode,
    authCode,
    setWallet,
    userEmail,
    emailBounce,
    setEmailBounce,
    setUserEmail,
    userPhoneNumber,
    setUserPhoneNumber,
    setUserId,
    userId,
    userTermsAccepted,
    setUserTermsAccepted,

    signupToken,
    setSignupToken,
    traceId,
    setTraceId,
  };
};
