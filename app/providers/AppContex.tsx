import { createContext } from "react";
import { WebAuthnWrapper } from "../passkey/WebAuthnWrapper";
const waw = new WebAuthnWrapper();

export const AppContext = createContext<WebAuthnWrapper>(waw);
