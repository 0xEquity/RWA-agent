import { atomWithMutation } from "jotai-tanstack-query";
import { DIRECTUS_API } from "./constant";

export interface ILogınUserProps {
  email: string | null;
  user_id: string | null;
  device_id: number;
  chain_id?: number;
}

export const loginAtom = atomWithMutation(() => ({
  mutationKey: ["user-login"],
  mutationFn: async (input: ILogınUserProps) => {
    const res = await fetch(DIRECTUS_API.LOGIN_WALLET_HOOK, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const data = await res.json();

    return data;
  }
}));

export const userNotExistAtom = atomWithMutation(() => ({
  mutationKey: [`user-not-exist`],
  mutationFn: async (input: { email: string; user_id: string }) => {
    const res = await fetch(DIRECTUS_API.USER_NOT_EXIST, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const data = await res.json();

    return data;
  }
}));
