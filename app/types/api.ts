export interface AgentRequest {
  userMessage: string;
}

export interface ComponentResponse {
  type: 'component';
  component: string;
  props: Record<string, unknown>;
  sender: 'agent';
}

export interface TextResponse {
  text: string;
  sender: 'agent';
}

export interface AgentResponse {
  response: ComponentResponse | TextResponse;
}
