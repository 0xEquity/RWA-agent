export const networkIdToName = {
  1: "mainnet",
  3: "ropsten",
  4: "rinkeby",
  5: "goerli",
  42: "kovan",
  56: "bsc",
  77: "sokol",
  97: "bscTestnet",
  10: "optimism",
  100: "gnosis",
  137: "polygon",
  80001: "mumbai",
  31337: "hardhat",
  43114: "avalanche",
  8453: "base",
  42161: "arbitrum",
  9999: "all chains",
  9998: "solana",
  88811: 'unit0'
} as const;

export const networkNameToId = {
  mainnet: 1,
  ropsten: 3,
  rinkeby: 4,
  goerli: 5,
  kovan: 42,
  bsc: 56,
  sokol: 77,
  bscTestnet: 97,
  gnosis: 100,
  avalanche: 43114,
  polygon: 137,
  optimism: 10,
  mumbai: 80001,
  hardhat: 31337,
  base: 8453,
  arbitrum: 42161,
  all: 9999,
  solana: 9998,
  unit0: 88811
} as const;

export const networkIdToId = {
  1: 1,
  3: 3,
  4: 4,
  5: 5,
  42: 42,
  56: 56,
  77: 77,
  97: 97,
  10: 10,
  100: 100,
  137: 137,
  80001: 80001,
  31337: 31337,
  43114: 43114,
  8453: 8453,
  42161: 42161,
  9999: 9999,
  9998: 9998,
  88811:88811
};

export const networkNameToName = {
  mainnet: "mainnet",
  ropsten: "ropsten",
  rinkeby: "rinkeby",
  goerli: "goerli",
  kovan: "kovan",
  bsc: "bsc",
  sokol: "sokol",
  bscTestnet: "bscTestnet",
  gnosis: "gnosis",
  polygon: "polygon",
  mumbai: "mumbai",
  hardhat: "hardhat",
  avalanche: "avalanche",
  optimism: "optimism",
  base: "base",
  arbitrum: "arbitrum",
  all: "all chains",
  solana: "solana",
  unit0: "unit0"
};

export type NetworkId = keyof typeof networkIdToName;
export type NetworkName = (typeof networkIdToName)[NetworkId];
export type Network = NetworkId | NetworkName;

export const ChainId = { ...networkIdToName, ...networkNameToId };
