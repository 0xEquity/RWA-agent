import { DIRECTUS_API } from "../atoms/constant";
import { NetworkId } from "../sdk/ChainId";


export interface RelayerProps {
  value: number;
  to: string;
  data: string;
  gas_limit: number;
  chain_id: NetworkId;
}
export const RelayerAPI = (
  data: RelayerProps,
): Promise<{ tx_hash: string }> => {
  return fetch(DIRECTUS_API.RELAYER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((r) => {
    return r.json();
  });
};
