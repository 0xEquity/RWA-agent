export interface AgentRequest {
  userMessage: string;
  actionPayload?: unknown; // For handling HITL action results
}

export interface WalletStatus {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
}

export interface TransactionActionPayload {
  to: string;
  from?: string;
  value?: string | number;
  data?: string;
  gasLimit?: string | number;
  gasPrice?: string | number;
  maxFeePerGas?: string | number;
  maxPriorityFeePerGas?: string | number;
  nonce?: number;
}

export interface SignatureActionPayload {
  message: string;
}

export interface ActionRequired {
  type: 'transaction' | 'signature';
  payload: TransactionActionPayload | SignatureActionPayload;
}

export interface ComponentResponse {
  type: 'component';
  component: string;
  props: Record<string, unknown>;
  sender: 'agent';
  walletStatus?: WalletStatus;
  requiresWalletConnection?: boolean;
  actionRequired?: ActionRequired;
}

export interface TextResponse {
  text: string;
  sender: 'agent';
  walletStatus?: WalletStatus;
  requiresWalletConnection?: boolean;
  actionRequired?: ActionRequired;
  error?: string;
}

export interface AgentResponse {
  response: ComponentResponse | TextResponse;
}
