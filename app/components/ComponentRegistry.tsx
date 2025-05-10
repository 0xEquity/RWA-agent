import { ConnectWallet } from './ConnectWallet';
import { ToolResponse } from './ToolResponse';
import { XWallet } from './XWallet';
import { WalletRequiredPrompt } from './WalletRequiredPrompt';
import { TransactionRequest } from './TransactionRequest';
import { SignatureRequest } from './SignatureRequest';

const componentRegistry = {
  ConnectWallet: ConnectWallet,
  ToolResponse: ToolResponse,
  XWallet: XWallet,
  WalletRequiredPrompt: WalletRequiredPrompt,
  TransactionRequest: TransactionRequest,
  SignatureRequest: SignatureRequest,
  // Add more components here as needed
};

export type ComponentName = keyof typeof componentRegistry;

export const getComponent = (name: string) => {
  if (name in componentRegistry) {
    return componentRegistry[name as ComponentName];
  }
  return null;
};

export default componentRegistry;