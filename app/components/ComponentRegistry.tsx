import { ConnectWallet } from './ConnectWallet';
import { ToolResponse } from './ToolResponse';

const componentRegistry = {
  ConnectWallet: ConnectWallet,
  ToolResponse: ToolResponse,
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