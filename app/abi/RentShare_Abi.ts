export const RentShare_Abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [], name: "AccessDenied", type: "error" },
  {
    inputs: [{ internalType: "string", name: "paramName", type: "string" }],
    name: "InvalidParam",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "poolId", type: "uint256" }],
    name: "InvalidPoolId",
    type: "error",
  },
  { inputs: [], name: "IsNotPaused", type: "error" },
  { inputs: [], name: "IsPaused", type: "error" },
  {
    inputs: [
      { internalType: "string", name: "propertySymbol", type: "string" },
    ],
    name: "PoolAlreadyExists",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "PropertyTokenNotWhitelisted",
    type: "error",
  },
  {
    inputs: [{ internalType: "string", name: "item", type: "string" }],
    name: "RegistryItemMissing",
    type: "error",
  },
  { inputs: [], name: "UndefinedAddress", type: "error" },
  {
    inputs: [{ internalType: "string", name: "paramName", type: "string" }],
    name: "ZeroAddress",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "delegator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "oldDelegatee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newDelegatee",
        type: "address",
      },
    ],
    name: "DelegateeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_poolId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_poolId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "HarvestRent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint8", name: "version", type: "uint8" },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "string", name: "symbol", type: "string" },
      {
        indexed: true,
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "PropertyRentClaimDurationUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "propertySymbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rentAmount",
        type: "uint256",
      },
    ],
    name: "PropertyRentUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "lockNftId",
        type: "uint256",
      },
    ],
    name: "RentClaimCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "bool", name: "flag", type: "bool" },
    ],
    name: "RentWrapperToogleUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: "address", name: "caller", type: "address" },
          { internalType: "uint256", name: "lockNftTokenId", type: "uint256" },
          { internalType: "string", name: "propertySymbol", type: "string" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        indexed: false,
        internalType: "struct IRentShare.LockNftDetailEvent",
        name: "lockNftDetailEvent",
        type: "tuple",
      },
    ],
    name: "RequestLockForRentClaim",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_poolId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "accessController",
    outputs: [
      { internalType: "contract IAccessController", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "lockNftTokenId", type: "uint256" },
    ],
    name: "cancelHarvestRewardsRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC20", name: "_stakeToken", type: "address" },
      { internalType: "string", name: "_symbol", type: "string" },
      { internalType: "uint256", name: "_poolId", type: "uint256" },
    ],
    name: "createPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "delegatee", type: "address" }],
    name: "delegateRent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_propertySymbol", type: "string" },
      { internalType: "address", name: "_sender", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenSymbol", type: "string" }],
    name: "getPoolRewardsPerSecond",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenSymbol", type: "string" }],
    name: "getPropertyToGlobalEpoch",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "symbol", type: "string" }],
    name: "getPropertyToRentClaimDuration",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "propertySymbol", type: "string" },
      { internalType: "address", name: "user", type: "address" },
    ],
    name: "getRecentAccruedRent_p",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "symbol", type: "string" }],
    name: "getSymbolToPropertyAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSystemRegistry",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "propertySymbol", type: "string" },
      { internalType: "address", name: "receiver", type: "address" },
    ],
    name: "getUserClaimableRent",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getUserDelegatee",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "propertySymbol", type: "string" },
      { internalType: "address", name: "user", type: "address" },
      { internalType: "uint256", name: "fromEpoch", type: "uint256" },
      { internalType: "uint256", name: "toEpoch", type: "uint256" },
    ],
    name: "getUserUnrealizedRentFromPreviousEpochsDetailedView",
    outputs: [
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "propertySymbol", type: "string" },
      { internalType: "address", name: "user", type: "address" },
    ],
    name: "getUserUnrealizedRentFromPreviousEpochs_p",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string[]", name: "symbols", type: "string[]" },
      { internalType: "address", name: "receiver", type: "address" },
    ],
    name: "harvestRent",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string[]", name: "symbols", type: "string[]" },
      { internalType: "address", name: "delegator", type: "address" },
      { internalType: "address", name: "receiver", type: "address" },
    ],
    name: "harvestRentOfDelegator",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISystemRegistry",
        name: "_systemRegistry",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "lockNftTokenId", type: "uint256" },
    ],
    name: "isLockNftMature",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenSymbol", type: "string" }],
    name: "isPropertyTokenWhitelisted",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC721Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "resetDelegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_staker", type: "address" },
      { internalType: "uint256", name: "_poolId", type: "uint256" },
    ],
    name: "resetMaliciousStakerAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bool", name: "flag", type: "bool" }],
    name: "toogleRentWrapper",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string[]", name: "symbols", type: "string[]" },
      { internalType: "uint256[]", name: "durations", type: "uint256[]" },
    ],
    name: "updatePropertyToRentClaimDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "tokenSymbol", type: "string" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "updateRewardPerMonth",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "newImplementation", type: "address" },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "newImplementation", type: "address" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "propertySymbol", type: "string" },
      { internalType: "address", name: "propertyHolder", type: "address" },
    ],
    name: "userToDetails",
    outputs: [
      { internalType: "uint256", name: "epochToTokenBalance", type: "uint256" },
      { internalType: "uint256", name: "epochToRentDebt", type: "uint256" },
      { internalType: "uint256", name: "lastEpoch", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "propertySymbol", type: "string" },
      { internalType: "address", name: "propertyHolder", type: "address" },
      { internalType: "uint256", name: "epoch", type: "uint256" },
    ],
    name: "userToEpochDetails",
    outputs: [
      { internalType: "uint256", name: "epochToTokenBalance", type: "uint256" },
      { internalType: "uint256", name: "epochToRentDebt", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_propertySymbol", type: "string" },
      { internalType: "address", name: "_sender", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
