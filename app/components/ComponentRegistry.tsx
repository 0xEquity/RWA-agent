import { ConnectWallet } from './ConnectWallet';
import { ToolResponse } from './ToolResponse';
import { XWallet } from './XWallet';

const componentRegistry = {
  ConnectWallet: ConnectWallet,
  ToolResponse: ToolResponse,
  XWallet: XWallet,
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