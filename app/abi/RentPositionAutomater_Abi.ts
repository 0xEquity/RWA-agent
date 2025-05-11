export const RENT_POSITION_AUTOMATER_Abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [], name: "AccessDenied", type: "error" },
  { inputs: [], name: "IsNotPaused", type: "error" },
  { inputs: [], name: "IsPaused", type: "error" },
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
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      { indexed: false, internalType: "string", name: "key", type: "string" },
      {
        indexed: false,
        internalType: "address",
        name: "delegatee",
        type: "address",
      },
    ],
    name: "NFTIndexCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
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
    name: "NFTIndexDelegateeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "oldKey",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "newKey",
        type: "string",
      },
    ],
    name: "NFTIndexKeyUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      { indexed: false, internalType: "bool", name: "oldStatus", type: "bool" },
      { indexed: false, internalType: "bool", name: "newStatus", type: "bool" },
    ],
    name: "NFTRewardAutomationStatusUpdated",
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
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address",
            name: "propertyTokenAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "noOfPropertyTokens",
            type: "uint256",
          },
          { internalType: "bool", name: "automateRewards", type: "bool" },
          {
            components: [
              {
                internalType:
                  "enum IRentPositionSettingsStructs.RewardBehavior",
                name: "rewardBehavior",
                type: "uint8",
              },
              {
                internalType: "address",
                name: "harvestTokenOut",
                type: "address",
              },
              {
                internalType: "address",
                name: "rewardrecipient",
                type: "address",
              },
            ],
            internalType: "struct IRentPositionSettingsStructs.RewardConfig",
            name: "rewardBehavior",
            type: "tuple",
          },
        ],
        indexed: false,
        internalType: "struct IRentPositionSettingsStructs.PositionSettings",
        name: "positionSettings",
        type: "tuple",
      },
    ],
    name: "PositionCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address",
            name: "propertyTokenAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "noOfPropertyTokens",
            type: "uint256",
          },
          { internalType: "bool", name: "automateRewards", type: "bool" },
          {
            components: [
              {
                internalType:
                  "enum IRentPositionSettingsStructs.RewardBehavior",
                name: "rewardBehavior",
                type: "uint8",
              },
              {
                internalType: "address",
                name: "harvestTokenOut",
                type: "address",
              },
              {
                internalType: "address",
                name: "rewardrecipient",
                type: "address",
              },
            ],
            internalType: "struct IRentPositionSettingsStructs.RewardConfig",
            name: "rewardBehavior",
            type: "tuple",
          },
        ],
        indexed: false,
        internalType: "struct IRentPositionSettingsStructs.PositionSettings",
        name: "positonOldSettings",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "propertyTokenAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "noOfPropertyTokens",
            type: "uint256",
          },
          { internalType: "bool", name: "automateRewards", type: "bool" },
          {
            components: [
              {
                internalType:
                  "enum IRentPositionSettingsStructs.RewardBehavior",
                name: "rewardBehavior",
                type: "uint8",
              },
              {
                internalType: "address",
                name: "harvestTokenOut",
                type: "address",
              },
              {
                internalType: "address",
                name: "rewardrecipient",
                type: "address",
              },
            ],
            internalType: "struct IRentPositionSettingsStructs.RewardConfig",
            name: "rewardBehavior",
            type: "tuple",
          },
        ],
        indexed: false,
        internalType: "struct IRentPositionSettingsStructs.PositionSettings",
        name: "positonNewSettings",
        type: "tuple",
      },
    ],
    name: "PositionUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "propertyTokenAddress",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "oldStatus", type: "bool" },
      { indexed: false, internalType: "bool", name: "newStatus", type: "bool" },
    ],
    name: "PropertyWhitelistUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
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
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
      { internalType: "uint256[]", name: "rents", type: "uint256[]" },
    ],
    name: "accumulateRent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "string", name: "key", type: "string" },
      { internalType: "address", name: "delegatee", type: "address" },
    ],
    name: "createNftNewIndex",
    outputs: [
      { internalType: "uint256", name: "createdIndex", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "propertyTokenAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "noOfPropertyTokens",
            type: "uint256",
          },
          { internalType: "bool", name: "automateRewards", type: "bool" },
          {
            components: [
              {
                internalType:
                  "enum IRentPositionSettingsStructs.RewardBehavior",
                name: "rewardBehavior",
                type: "uint8",
              },
              {
                internalType: "address",
                name: "harvestTokenOut",
                type: "address",
              },
              {
                internalType: "address",
                name: "rewardrecipient",
                type: "address",
              },
            ],
            internalType: "struct IRentPositionSettingsStructs.RewardConfig",
            name: "rewardBehavior",
            type: "tuple",
          },
        ],
        internalType: "struct IRentPositionSettingsStructs.PositionSettings",
        name: "positionSettings",
        type: "tuple",
      },
    ],
    name: "createPosition",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "rent", type: "uint256" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "depositRentAgainstNft",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getNftTotalRent",
    outputs: [{ internalType: "uint256", name: "totalRent", type: "uint256" }],
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
      { internalType: "address", name: "propertyToken", type: "address" },
      { internalType: "address", name: "user", type: "address" },
    ],
    name: "getUserRentPositionsAndAmountForProperty",
    outputs: [
      {
        internalType: "uint256[]",
        name: "nftIdsOfMatchedProperty",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amountOfPropertyInEachPosition",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "totalPropertyTokensAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "propertyToken", type: "address" },
    ],
    name: "isPropertyWhitelisted",
    outputs: [{ internalType: "bool", name: "flag", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nftCounter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
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
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bool", name: "newStatus", type: "bool" },
    ],
    name: "setAutomateRewardsStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "baseURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "tokenIdToNFTDetails",
    outputs: [
      { internalType: "string", name: "key", type: "string" },
      { internalType: "address", name: "delegatee", type: "address" },
      { internalType: "uint256", name: "rentAccumulated", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenIdToPositionSettings",
    outputs: [
      {
        internalType: "address",
        name: "propertyTokenAddress",
        type: "address",
      },
      { internalType: "uint256", name: "noOfPropertyTokens", type: "uint256" },
      { internalType: "bool", name: "automateRewards", type: "bool" },
      {
        components: [
          {
            internalType: "enum IRentPositionSettingsStructs.RewardBehavior",
            name: "rewardBehavior",
            type: "uint8",
          },
          { internalType: "address", name: "harvestTokenOut", type: "address" },
          { internalType: "address", name: "rewardrecipient", type: "address" },
        ],
        internalType: "struct IRentPositionSettingsStructs.RewardConfig",
        name: "rewardBehavior",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
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
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      {
        components: [
          {
            internalType: "address",
            name: "propertyTokenAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "noOfPropertyTokens",
            type: "uint256",
          },
          { internalType: "bool", name: "automateRewards", type: "bool" },
          {
            components: [
              {
                internalType:
                  "enum IRentPositionSettingsStructs.RewardBehavior",
                name: "rewardBehavior",
                type: "uint8",
              },
              {
                internalType: "address",
                name: "harvestTokenOut",
                type: "address",
              },
              {
                internalType: "address",
                name: "rewardrecipient",
                type: "address",
              },
            ],
            internalType: "struct IRentPositionSettingsStructs.RewardConfig",
            name: "rewardBehavior",
            type: "tuple",
          },
        ],
        internalType: "struct IRentPositionSettingsStructs.PositionSettings",
        name: "positionNewSettings",
        type: "tuple",
      },
    ],
    name: "updateNFTSettings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "index", type: "uint256" },
      { internalType: "address", name: "newDelegatee", type: "address" },
    ],
    name: "updateNftIndexDelegatee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "index", type: "uint256" },
      { internalType: "string", name: "newKey", type: "string" },
    ],
    name: "updateNftIndexKey",
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
      {
        internalType: "address",
        name: "propertyTokenAddress",
        type: "address",
      },
      { internalType: "bool", name: "status", type: "bool" },
    ],
    name: "whitelistProperty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "index", type: "uint256" },
      { internalType: "address", name: "receiver", type: "address" },
    ],
    name: "withdrawRentOfIndex",
    outputs: [{ internalType: "uint256", name: "rent", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
      { internalType: "uint256[]", name: "indexes", type: "uint256[]" },
      { internalType: "address", name: "receiver", type: "address" },
    ],
    name: "withdrawRentOfIndexBatch",
    outputs: [{ internalType: "uint256", name: "totalRent", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "address", name: "receiver", type: "address" },
    ],
    name: "withdrawTotalRent",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
      { internalType: "address", name: "receiver", type: "address" },
    ],
    name: "withdrawTotalRentBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
