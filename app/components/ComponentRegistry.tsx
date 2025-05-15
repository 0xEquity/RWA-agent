import { ConnectWallet } from './ConnectWallet';
import { ToolResponse } from './ToolResponse';
import { XWallet } from './XWallet';
import { WalletRequiredPrompt } from './WalletRequiredPrompt';
import { AutomateRentTx } from './AutomateRentTransaction';
import { PropertyDisplay } from './PropertyDisplay';
import { InvestmentCalculator } from './InvestmentCalculator';

const componentRegistry = {
  ConnectWallet: ConnectWallet,
  AutomateRentTx: AutomateRentTx,
  ToolResponse: ToolResponse,
  XWallet: XWallet,
  WalletRequiredPrompt: WalletRequiredPrompt,
  PropertyDisplay: PropertyDisplay,
  InvestmentCalculator: InvestmentCalculator,
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