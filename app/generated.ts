import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RentPositionAutomater
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const rentPositionAutomaterAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  { type: 'error', inputs: [], name: 'AccessDenied' },
  { type: 'error', inputs: [], name: 'IsNotPaused' },
  { type: 'error', inputs: [], name: 'IsPaused' },
  {
    type: 'error',
    inputs: [{ name: 'item', internalType: 'string', type: 'string' }],
    name: 'RegistryItemMissing',
  },
  { type: 'error', inputs: [], name: 'UndefinedAddress' },
  {
    type: 'error',
    inputs: [{ name: 'paramName', internalType: 'string', type: 'string' }],
    name: 'ZeroAddress',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'delegatee',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'NFTIndexCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'oldDelegatee',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newDelegatee',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'NFTIndexDelegateeUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'oldKey',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'newKey',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'NFTIndexKeyUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'oldStatus', internalType: 'bool', type: 'bool', indexed: false },
      { name: 'newStatus', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'NFTRewardAutomationStatusUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'positionSettings',
        internalType: 'struct IRentPositionSettingsStructs.PositionSettings',
        type: 'tuple',
        components: [
          {
            name: 'propertyTokenAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'noOfPropertyTokens',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'automateRewards', internalType: 'bool', type: 'bool' },
          {
            name: 'rewardBehavior',
            internalType: 'struct IRentPositionSettingsStructs.RewardConfig',
            type: 'tuple',
            components: [
              {
                name: 'rewardBehavior',
                internalType:
                  'enum IRentPositionSettingsStructs.RewardBehavior',
                type: 'uint8',
              },
              {
                name: 'harvestTokenOut',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'rewardrecipient',
                internalType: 'address',
                type: 'address',
              },
            ],
          },
        ],
        indexed: false,
      },
    ],
    name: 'PositionCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'positonOldSettings',
        internalType: 'struct IRentPositionSettingsStructs.PositionSettings',
        type: 'tuple',
        components: [
          {
            name: 'propertyTokenAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'noOfPropertyTokens',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'automateRewards', internalType: 'bool', type: 'bool' },
          {
            name: 'rewardBehavior',
            internalType: 'struct IRentPositionSettingsStructs.RewardConfig',
            type: 'tuple',
            components: [
              {
                name: 'rewardBehavior',
                internalType:
                  'enum IRentPositionSettingsStructs.RewardBehavior',
                type: 'uint8',
              },
              {
                name: 'harvestTokenOut',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'rewardrecipient',
                internalType: 'address',
                type: 'address',
              },
            ],
          },
        ],
        indexed: false,
      },
      {
        name: 'positonNewSettings',
        internalType: 'struct IRentPositionSettingsStructs.PositionSettings',
        type: 'tuple',
        components: [
          {
            name: 'propertyTokenAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'noOfPropertyTokens',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'automateRewards', internalType: 'bool', type: 'bool' },
          {
            name: 'rewardBehavior',
            internalType: 'struct IRentPositionSettingsStructs.RewardConfig',
            type: 'tuple',
            components: [
              {
                name: 'rewardBehavior',
                internalType:
                  'enum IRentPositionSettingsStructs.RewardBehavior',
                type: 'uint8',
              },
              {
                name: 'harvestTokenOut',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'rewardrecipient',
                internalType: 'address',
                type: 'address',
              },
            ],
          },
        ],
        indexed: false,
      },
    ],
    name: 'PositionUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'propertyTokenAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'oldStatus', internalType: 'bool', type: 'bool', indexed: false },
      { name: 'newStatus', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'PropertyWhitelistUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'function',
    inputs: [],
    name: 'accessController',
    outputs: [
      { name: '', internalType: 'contract IAccessController', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'rents', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'accumulateRent',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'key', internalType: 'string', type: 'string' },
      { name: 'delegatee', internalType: 'address', type: 'address' },
    ],
    name: 'createNftNewIndex',
    outputs: [
      { name: 'createdIndex', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'positionSettings',
        internalType: 'struct IRentPositionSettingsStructs.PositionSettings',
        type: 'tuple',
        components: [
          {
            name: 'propertyTokenAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'noOfPropertyTokens',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'automateRewards', internalType: 'bool', type: 'bool' },
          {
            name: 'rewardBehavior',
            internalType: 'struct IRentPositionSettingsStructs.RewardConfig',
            type: 'tuple',
            components: [
              {
                name: 'rewardBehavior',
                internalType:
                  'enum IRentPositionSettingsStructs.RewardBehavior',
                type: 'uint8',
              },
              {
                name: 'harvestTokenOut',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'rewardrecipient',
                internalType: 'address',
                type: 'address',
              },
            ],
          },
        ],
      },
    ],
    name: 'createPosition',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'rent', internalType: 'uint256', type: 'uint256' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'depositRentAgainstNft',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getNftTotalRent',
    outputs: [{ name: 'totalRent', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getSystemRegistry',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'propertyToken', internalType: 'address', type: 'address' },
      { name: 'user', internalType: 'address', type: 'address' },
    ],
    name: 'getUserRentPositionsAndAmountForProperty',
    outputs: [
      {
        name: 'nftIdsOfMatchedProperty',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
      {
        name: 'amountOfPropertyInEachPosition',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
      {
        name: 'totalPropertyTokensAmount',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_systemRegistry',
        internalType: 'contract ISystemRegistry',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'propertyToken', internalType: 'address', type: 'address' },
    ],
    name: 'isPropertyWhitelisted',
    outputs: [{ name: 'flag', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nftCounter',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'newStatus', internalType: 'bool', type: 'bool' },
    ],
    name: 'setAutomateRewardsStatus',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'baseURI', internalType: 'string', type: 'string' }],
    name: 'setBaseURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenIdToNFTDetails',
    outputs: [
      { name: 'key', internalType: 'string', type: 'string' },
      { name: 'delegatee', internalType: 'address', type: 'address' },
      { name: 'rentAccumulated', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenIdToPositionSettings',
    outputs: [
      {
        name: 'propertyTokenAddress',
        internalType: 'address',
        type: 'address',
      },
      { name: 'noOfPropertyTokens', internalType: 'uint256', type: 'uint256' },
      { name: 'automateRewards', internalType: 'bool', type: 'bool' },
      {
        name: 'rewardBehavior',
        internalType: 'struct IRentPositionSettingsStructs.RewardConfig',
        type: 'tuple',
        components: [
          {
            name: 'rewardBehavior',
            internalType: 'enum IRentPositionSettingsStructs.RewardBehavior',
            type: 'uint8',
          },
          { name: 'harvestTokenOut', internalType: 'address', type: 'address' },
          { name: 'rewardrecipient', internalType: 'address', type: 'address' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      {
        name: 'positionNewSettings',
        internalType: 'struct IRentPositionSettingsStructs.PositionSettings',
        type: 'tuple',
        components: [
          {
            name: 'propertyTokenAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'noOfPropertyTokens',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'automateRewards', internalType: 'bool', type: 'bool' },
          {
            name: 'rewardBehavior',
            internalType: 'struct IRentPositionSettingsStructs.RewardConfig',
            type: 'tuple',
            components: [
              {
                name: 'rewardBehavior',
                internalType:
                  'enum IRentPositionSettingsStructs.RewardBehavior',
                type: 'uint8',
              },
              {
                name: 'harvestTokenOut',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'rewardrecipient',
                internalType: 'address',
                type: 'address',
              },
            ],
          },
        ],
      },
    ],
    name: 'updateNFTSettings',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'newDelegatee', internalType: 'address', type: 'address' },
    ],
    name: 'updateNftIndexDelegatee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'newKey', internalType: 'string', type: 'string' },
    ],
    name: 'updateNftIndexKey',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
    ],
    name: 'upgradeTo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'propertyTokenAddress',
        internalType: 'address',
        type: 'address',
      },
      { name: 'status', internalType: 'bool', type: 'bool' },
    ],
    name: 'whitelistProperty',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'withdrawRentOfIndex',
    outputs: [{ name: 'rent', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'indexes', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'withdrawRentOfIndexBatch',
    outputs: [{ name: 'totalRent', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'withdrawTotalRent',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'withdrawTotalRentBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// rentShare
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const rentShareAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  { type: 'error', inputs: [], name: 'AccessDenied' },
  {
    type: 'error',
    inputs: [{ name: 'paramName', internalType: 'string', type: 'string' }],
    name: 'InvalidParam',
  },
  {
    type: 'error',
    inputs: [{ name: 'poolId', internalType: 'uint256', type: 'uint256' }],
    name: 'InvalidPoolId',
  },
  { type: 'error', inputs: [], name: 'IsNotPaused' },
  { type: 'error', inputs: [], name: 'IsPaused' },
  {
    type: 'error',
    inputs: [
      { name: 'propertySymbol', internalType: 'string', type: 'string' },
    ],
    name: 'PoolAlreadyExists',
  },
  {
    type: 'error',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'PropertyTokenNotWhitelisted',
  },
  {
    type: 'error',
    inputs: [{ name: 'item', internalType: 'string', type: 'string' }],
    name: 'RegistryItemMissing',
  },
  { type: 'error', inputs: [], name: 'UndefinedAddress' },
  {
    type: 'error',
    inputs: [{ name: 'paramName', internalType: 'string', type: 'string' }],
    name: 'ZeroAddress',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'oldDelegatee',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newDelegatee',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DelegateeUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: '_poolId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_poolId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: '_amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'HarvestRent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'symbol', internalType: 'string', type: 'string', indexed: true },
      {
        name: 'duration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'PropertyRentClaimDurationUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'propertySymbol',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'rentAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PropertyRentUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'lockNftId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'RentClaimCancelled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'flag', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'RentWrapperToogleUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'lockNftDetailEvent',
        internalType: 'struct IRentShare.LockNftDetailEvent',
        type: 'tuple',
        components: [
          { name: 'caller', internalType: 'address', type: 'address' },
          { name: 'lockNftTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'propertySymbol', internalType: 'string', type: 'string' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
    ],
    name: 'RequestLockForRentClaim',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: '_poolId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdraw',
  },
  {
    type: 'function',
    inputs: [],
    name: 'accessController',
    outputs: [
      { name: '', internalType: 'contract IAccessController', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'lockNftTokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'cancelHarvestRewardsRequest',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_stakeToken', internalType: 'contract IERC20', type: 'address' },
      { name: '_symbol', internalType: 'string', type: 'string' },
      { name: '_poolId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createPool',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'delegatee', internalType: 'address', type: 'address' }],
    name: 'delegateRent',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_propertySymbol', internalType: 'string', type: 'string' },
      { name: '_sender', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenSymbol', internalType: 'string', type: 'string' }],
    name: 'getPoolRewardsPerSecond',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenSymbol', internalType: 'string', type: 'string' }],
    name: 'getPropertyToGlobalEpoch',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'symbol', internalType: 'string', type: 'string' }],
    name: 'getPropertyToRentClaimDuration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'propertySymbol', internalType: 'string', type: 'string' },
      { name: 'user', internalType: 'address', type: 'address' },
    ],
    name: 'getRecentAccruedRent_p',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'symbol', internalType: 'string', type: 'string' }],
    name: 'getSymbolToPropertyAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getSystemRegistry',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'propertySymbol', internalType: 'string', type: 'string' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'getUserClaimableRent',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUserDelegatee',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'propertySymbol', internalType: 'string', type: 'string' },
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'fromEpoch', internalType: 'uint256', type: 'uint256' },
      { name: 'toEpoch', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getUserUnrealizedRentFromPreviousEpochsDetailedView',
    outputs: [
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'propertySymbol', internalType: 'string', type: 'string' },
      { name: 'user', internalType: 'address', type: 'address' },
    ],
    name: 'getUserUnrealizedRentFromPreviousEpochs_p',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'symbols', internalType: 'string[]', type: 'string[]' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'harvestRent',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'symbols', internalType: 'string[]', type: 'string[]' },
      { name: 'delegator', internalType: 'address', type: 'address' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'harvestRentOfDelegator',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_systemRegistry',
        internalType: 'contract ISystemRegistry',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'lockNftTokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'isLockNftMature',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenSymbol', internalType: 'string', type: 'string' }],
    name: 'isPropertyTokenWhitelisted',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'resetDelegate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_staker', internalType: 'address', type: 'address' },
      { name: '_poolId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'resetMaliciousStakerAmount',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'flag', internalType: 'bool', type: 'bool' }],
    name: 'toogleRentWrapper',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'symbols', internalType: 'string[]', type: 'string[]' },
      { name: 'durations', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'updatePropertyToRentClaimDuration',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenSymbol', internalType: 'string', type: 'string' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateRewardPerMonth',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
    ],
    name: 'upgradeTo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'propertySymbol', internalType: 'string', type: 'string' },
      { name: 'propertyHolder', internalType: 'address', type: 'address' },
    ],
    name: 'userToDetails',
    outputs: [
      { name: 'epochToTokenBalance', internalType: 'uint256', type: 'uint256' },
      { name: 'epochToRentDebt', internalType: 'uint256', type: 'uint256' },
      { name: 'lastEpoch', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'propertySymbol', internalType: 'string', type: 'string' },
      { name: 'propertyHolder', internalType: 'address', type: 'address' },
      { name: 'epoch', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userToEpochDetails',
    outputs: [
      { name: 'epochToTokenBalance', internalType: 'uint256', type: 'uint256' },
      { name: 'epochToRentDebt', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_propertySymbol', internalType: 'string', type: 'string' },
      { name: '_sender', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__
 */
export const useReadRentPositionAutomater = /*#__PURE__*/ createUseReadContract(
  { abi: rentPositionAutomaterAbi },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"accessController"`
 */
export const useReadRentPositionAutomaterAccessController =
  /*#__PURE__*/ createUseReadContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'accessController',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadRentPositionAutomaterBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadRentPositionAutomaterGetApproved =
  /*#__PURE__*/ createUseReadContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'getApproved',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"getNftTotalRent"`
 */
export const useReadRentPositionAutomaterGetNftTotalRent =
  /*#__PURE__*/ createUseReadContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'getNftTotalRent',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"getSystemRegistry"`
 */
export const useReadRentPositionAutomaterGetSystemRegistry =
  /*#__PURE__*/ createUseReadContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'getSystemRegistry',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"getUserRentPositionsAndAmountForProperty"`
 */
export const useReadRentPositionAutomaterGetUserRentPositionsAndAmountForProperty =
  /*#__PURE__*/ createUseReadContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'getUserRentPositionsAndAmountForProperty',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadRentPositionAutomaterIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"isPropertyWhitelisted"`
 */
export const useReadRentPositionAutomaterIsPropertyWhitelisted =
  /*#__PURE__*/ createUseReadContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'isPropertyWhitelisted',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"name"`
 */
export const useReadRentPositionAutomaterName =
  /*#__PURE__*/ createUseReadContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'name',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"nftCounter"`
 */
export const useReadRentPositionAutomaterNftCounter =
  /*#__PURE__*/ createUseReadContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'nftCounter',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadRentPositionAutomaterOwnerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'ownerOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"paused"`
 */
export const useReadRentPositionAutomaterPaused =
  /*#__PURE__*/ createUseReadContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'paused',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadRentPositionAutomaterProxiableUuid =
  /*#__PURE__*/ createUseReadContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'proxiableUUID',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadRentPositionAutomaterSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadRentPositionAutomaterSymbol =
  /*#__PURE__*/ createUseReadContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'symbol',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"tokenByIndex"`
 */
export const useReadRentPositionAutomaterTokenByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'tokenByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"tokenIdToNFTDetails"`
 */
export const useReadRentPositionAutomaterTokenIdToNftDetails =
  /*#__PURE__*/ createUseReadContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'tokenIdToNFTDetails',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"tokenIdToPositionSettings"`
 */
export const useReadRentPositionAutomaterTokenIdToPositionSettings =
  /*#__PURE__*/ createUseReadContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'tokenIdToPositionSettings',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 */
export const useReadRentPositionAutomaterTokenOfOwnerByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'tokenOfOwnerByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadRentPositionAutomaterTokenUri =
  /*#__PURE__*/ createUseReadContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'tokenURI',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadRentPositionAutomaterTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__
 */
export const useWriteRentPositionAutomater =
  /*#__PURE__*/ createUseWriteContract({ abi: rentPositionAutomaterAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"accumulateRent"`
 */
export const useWriteRentPositionAutomaterAccumulateRent =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'accumulateRent',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteRentPositionAutomaterApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteRentPositionAutomaterBurn =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"createNftNewIndex"`
 */
export const useWriteRentPositionAutomaterCreateNftNewIndex =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'createNftNewIndex',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"createPosition"`
 */
export const useWriteRentPositionAutomaterCreatePosition =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'createPosition',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"depositRentAgainstNft"`
 */
export const useWriteRentPositionAutomaterDepositRentAgainstNft =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'depositRentAgainstNft',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteRentPositionAutomaterInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteRentPositionAutomaterPause =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'pause',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteRentPositionAutomaterSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteRentPositionAutomaterSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"setAutomateRewardsStatus"`
 */
export const useWriteRentPositionAutomaterSetAutomateRewardsStatus =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'setAutomateRewardsStatus',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"setBaseURI"`
 */
export const useWriteRentPositionAutomaterSetBaseUri =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'setBaseURI',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteRentPositionAutomaterTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteRentPositionAutomaterUnpause =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"updateNFTSettings"`
 */
export const useWriteRentPositionAutomaterUpdateNftSettings =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'updateNFTSettings',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"updateNftIndexDelegatee"`
 */
export const useWriteRentPositionAutomaterUpdateNftIndexDelegatee =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'updateNftIndexDelegatee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"updateNftIndexKey"`
 */
export const useWriteRentPositionAutomaterUpdateNftIndexKey =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'updateNftIndexKey',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"upgradeTo"`
 */
export const useWriteRentPositionAutomaterUpgradeTo =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'upgradeTo',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useWriteRentPositionAutomaterUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"whitelistProperty"`
 */
export const useWriteRentPositionAutomaterWhitelistProperty =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'whitelistProperty',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"withdrawRentOfIndex"`
 */
export const useWriteRentPositionAutomaterWithdrawRentOfIndex =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'withdrawRentOfIndex',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"withdrawRentOfIndexBatch"`
 */
export const useWriteRentPositionAutomaterWithdrawRentOfIndexBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'withdrawRentOfIndexBatch',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"withdrawTotalRent"`
 */
export const useWriteRentPositionAutomaterWithdrawTotalRent =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'withdrawTotalRent',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"withdrawTotalRentBatch"`
 */
export const useWriteRentPositionAutomaterWithdrawTotalRentBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'withdrawTotalRentBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__
 */
export const useSimulateRentPositionAutomater =
  /*#__PURE__*/ createUseSimulateContract({ abi: rentPositionAutomaterAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"accumulateRent"`
 */
export const useSimulateRentPositionAutomaterAccumulateRent =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'accumulateRent',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateRentPositionAutomaterApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateRentPositionAutomaterBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"createNftNewIndex"`
 */
export const useSimulateRentPositionAutomaterCreateNftNewIndex =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'createNftNewIndex',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"createPosition"`
 */
export const useSimulateRentPositionAutomaterCreatePosition =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'createPosition',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"depositRentAgainstNft"`
 */
export const useSimulateRentPositionAutomaterDepositRentAgainstNft =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'depositRentAgainstNft',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateRentPositionAutomaterInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateRentPositionAutomaterPause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'pause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateRentPositionAutomaterSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateRentPositionAutomaterSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"setAutomateRewardsStatus"`
 */
export const useSimulateRentPositionAutomaterSetAutomateRewardsStatus =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'setAutomateRewardsStatus',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"setBaseURI"`
 */
export const useSimulateRentPositionAutomaterSetBaseUri =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'setBaseURI',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateRentPositionAutomaterTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateRentPositionAutomaterUnpause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"updateNFTSettings"`
 */
export const useSimulateRentPositionAutomaterUpdateNftSettings =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'updateNFTSettings',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"updateNftIndexDelegatee"`
 */
export const useSimulateRentPositionAutomaterUpdateNftIndexDelegatee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'updateNftIndexDelegatee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"updateNftIndexKey"`
 */
export const useSimulateRentPositionAutomaterUpdateNftIndexKey =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'updateNftIndexKey',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"upgradeTo"`
 */
export const useSimulateRentPositionAutomaterUpgradeTo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'upgradeTo',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useSimulateRentPositionAutomaterUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"whitelistProperty"`
 */
export const useSimulateRentPositionAutomaterWhitelistProperty =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'whitelistProperty',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"withdrawRentOfIndex"`
 */
export const useSimulateRentPositionAutomaterWithdrawRentOfIndex =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'withdrawRentOfIndex',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"withdrawRentOfIndexBatch"`
 */
export const useSimulateRentPositionAutomaterWithdrawRentOfIndexBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'withdrawRentOfIndexBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"withdrawTotalRent"`
 */
export const useSimulateRentPositionAutomaterWithdrawTotalRent =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'withdrawTotalRent',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `functionName` set to `"withdrawTotalRentBatch"`
 */
export const useSimulateRentPositionAutomaterWithdrawTotalRentBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentPositionAutomaterAbi,
    functionName: 'withdrawTotalRentBatch',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentPositionAutomaterAbi}__
 */
export const useWatchRentPositionAutomaterEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: rentPositionAutomaterAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `eventName` set to `"AdminChanged"`
 */
export const useWatchRentPositionAutomaterAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentPositionAutomaterAbi,
    eventName: 'AdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchRentPositionAutomaterApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentPositionAutomaterAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchRentPositionAutomaterApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentPositionAutomaterAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `eventName` set to `"BeaconUpgraded"`
 */
export const useWatchRentPositionAutomaterBeaconUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentPositionAutomaterAbi,
    eventName: 'BeaconUpgraded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchRentPositionAutomaterInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentPositionAutomaterAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `eventName` set to `"NFTIndexCreated"`
 */
export const useWatchRentPositionAutomaterNftIndexCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentPositionAutomaterAbi,
    eventName: 'NFTIndexCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `eventName` set to `"NFTIndexDelegateeUpdated"`
 */
export const useWatchRentPositionAutomaterNftIndexDelegateeUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentPositionAutomaterAbi,
    eventName: 'NFTIndexDelegateeUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `eventName` set to `"NFTIndexKeyUpdated"`
 */
export const useWatchRentPositionAutomaterNftIndexKeyUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentPositionAutomaterAbi,
    eventName: 'NFTIndexKeyUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `eventName` set to `"NFTRewardAutomationStatusUpdated"`
 */
export const useWatchRentPositionAutomaterNftRewardAutomationStatusUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentPositionAutomaterAbi,
    eventName: 'NFTRewardAutomationStatusUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchRentPositionAutomaterPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentPositionAutomaterAbi,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `eventName` set to `"PositionCreated"`
 */
export const useWatchRentPositionAutomaterPositionCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentPositionAutomaterAbi,
    eventName: 'PositionCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `eventName` set to `"PositionUpdated"`
 */
export const useWatchRentPositionAutomaterPositionUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentPositionAutomaterAbi,
    eventName: 'PositionUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `eventName` set to `"PropertyWhitelistUpdated"`
 */
export const useWatchRentPositionAutomaterPropertyWhitelistUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentPositionAutomaterAbi,
    eventName: 'PropertyWhitelistUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchRentPositionAutomaterTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentPositionAutomaterAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchRentPositionAutomaterUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentPositionAutomaterAbi,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentPositionAutomaterAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchRentPositionAutomaterUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentPositionAutomaterAbi,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentShareAbi}__
 */
export const useReadRentShare = /*#__PURE__*/ createUseReadContract({
  abi: rentShareAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"accessController"`
 */
export const useReadRentShareAccessController =
  /*#__PURE__*/ createUseReadContract({
    abi: rentShareAbi,
    functionName: 'accessController',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"getPoolRewardsPerSecond"`
 */
export const useReadRentShareGetPoolRewardsPerSecond =
  /*#__PURE__*/ createUseReadContract({
    abi: rentShareAbi,
    functionName: 'getPoolRewardsPerSecond',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"getPropertyToGlobalEpoch"`
 */
export const useReadRentShareGetPropertyToGlobalEpoch =
  /*#__PURE__*/ createUseReadContract({
    abi: rentShareAbi,
    functionName: 'getPropertyToGlobalEpoch',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"getPropertyToRentClaimDuration"`
 */
export const useReadRentShareGetPropertyToRentClaimDuration =
  /*#__PURE__*/ createUseReadContract({
    abi: rentShareAbi,
    functionName: 'getPropertyToRentClaimDuration',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"getRecentAccruedRent_p"`
 */
export const useReadRentShareGetRecentAccruedRentP =
  /*#__PURE__*/ createUseReadContract({
    abi: rentShareAbi,
    functionName: 'getRecentAccruedRent_p',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"getSymbolToPropertyAddress"`
 */
export const useReadRentShareGetSymbolToPropertyAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: rentShareAbi,
    functionName: 'getSymbolToPropertyAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"getSystemRegistry"`
 */
export const useReadRentShareGetSystemRegistry =
  /*#__PURE__*/ createUseReadContract({
    abi: rentShareAbi,
    functionName: 'getSystemRegistry',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"getUserClaimableRent"`
 */
export const useReadRentShareGetUserClaimableRent =
  /*#__PURE__*/ createUseReadContract({
    abi: rentShareAbi,
    functionName: 'getUserClaimableRent',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"getUserDelegatee"`
 */
export const useReadRentShareGetUserDelegatee =
  /*#__PURE__*/ createUseReadContract({
    abi: rentShareAbi,
    functionName: 'getUserDelegatee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"getUserUnrealizedRentFromPreviousEpochsDetailedView"`
 */
export const useReadRentShareGetUserUnrealizedRentFromPreviousEpochsDetailedView =
  /*#__PURE__*/ createUseReadContract({
    abi: rentShareAbi,
    functionName: 'getUserUnrealizedRentFromPreviousEpochsDetailedView',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"getUserUnrealizedRentFromPreviousEpochs_p"`
 */
export const useReadRentShareGetUserUnrealizedRentFromPreviousEpochsP =
  /*#__PURE__*/ createUseReadContract({
    abi: rentShareAbi,
    functionName: 'getUserUnrealizedRentFromPreviousEpochs_p',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"isLockNftMature"`
 */
export const useReadRentShareIsLockNftMature =
  /*#__PURE__*/ createUseReadContract({
    abi: rentShareAbi,
    functionName: 'isLockNftMature',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"isPropertyTokenWhitelisted"`
 */
export const useReadRentShareIsPropertyTokenWhitelisted =
  /*#__PURE__*/ createUseReadContract({
    abi: rentShareAbi,
    functionName: 'isPropertyTokenWhitelisted',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"paused"`
 */
export const useReadRentSharePaused = /*#__PURE__*/ createUseReadContract({
  abi: rentShareAbi,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadRentShareProxiableUuid =
  /*#__PURE__*/ createUseReadContract({
    abi: rentShareAbi,
    functionName: 'proxiableUUID',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"userToDetails"`
 */
export const useReadRentShareUserToDetails =
  /*#__PURE__*/ createUseReadContract({
    abi: rentShareAbi,
    functionName: 'userToDetails',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"userToEpochDetails"`
 */
export const useReadRentShareUserToEpochDetails =
  /*#__PURE__*/ createUseReadContract({
    abi: rentShareAbi,
    functionName: 'userToEpochDetails',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentShareAbi}__
 */
export const useWriteRentShare = /*#__PURE__*/ createUseWriteContract({
  abi: rentShareAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"cancelHarvestRewardsRequest"`
 */
export const useWriteRentShareCancelHarvestRewardsRequest =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentShareAbi,
    functionName: 'cancelHarvestRewardsRequest',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"createPool"`
 */
export const useWriteRentShareCreatePool = /*#__PURE__*/ createUseWriteContract(
  { abi: rentShareAbi, functionName: 'createPool' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"delegateRent"`
 */
export const useWriteRentShareDelegateRent =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentShareAbi,
    functionName: 'delegateRent',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteRentShareDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: rentShareAbi,
  functionName: 'deposit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"harvestRent"`
 */
export const useWriteRentShareHarvestRent =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentShareAbi,
    functionName: 'harvestRent',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"harvestRentOfDelegator"`
 */
export const useWriteRentShareHarvestRentOfDelegator =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentShareAbi,
    functionName: 'harvestRentOfDelegator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteRentShareInitialize = /*#__PURE__*/ createUseWriteContract(
  { abi: rentShareAbi, functionName: 'initialize' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const useWriteRentShareOnErc721Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentShareAbi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteRentSharePause = /*#__PURE__*/ createUseWriteContract({
  abi: rentShareAbi,
  functionName: 'pause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"resetDelegate"`
 */
export const useWriteRentShareResetDelegate =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentShareAbi,
    functionName: 'resetDelegate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"resetMaliciousStakerAmount"`
 */
export const useWriteRentShareResetMaliciousStakerAmount =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentShareAbi,
    functionName: 'resetMaliciousStakerAmount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"toogleRentWrapper"`
 */
export const useWriteRentShareToogleRentWrapper =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentShareAbi,
    functionName: 'toogleRentWrapper',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteRentShareUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: rentShareAbi,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"updatePropertyToRentClaimDuration"`
 */
export const useWriteRentShareUpdatePropertyToRentClaimDuration =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentShareAbi,
    functionName: 'updatePropertyToRentClaimDuration',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"updateRewardPerMonth"`
 */
export const useWriteRentShareUpdateRewardPerMonth =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentShareAbi,
    functionName: 'updateRewardPerMonth',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"upgradeTo"`
 */
export const useWriteRentShareUpgradeTo = /*#__PURE__*/ createUseWriteContract({
  abi: rentShareAbi,
  functionName: 'upgradeTo',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useWriteRentShareUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: rentShareAbi,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteRentShareWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: rentShareAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentShareAbi}__
 */
export const useSimulateRentShare = /*#__PURE__*/ createUseSimulateContract({
  abi: rentShareAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"cancelHarvestRewardsRequest"`
 */
export const useSimulateRentShareCancelHarvestRewardsRequest =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentShareAbi,
    functionName: 'cancelHarvestRewardsRequest',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"createPool"`
 */
export const useSimulateRentShareCreatePool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentShareAbi,
    functionName: 'createPool',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"delegateRent"`
 */
export const useSimulateRentShareDelegateRent =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentShareAbi,
    functionName: 'delegateRent',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateRentShareDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentShareAbi,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"harvestRent"`
 */
export const useSimulateRentShareHarvestRent =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentShareAbi,
    functionName: 'harvestRent',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"harvestRentOfDelegator"`
 */
export const useSimulateRentShareHarvestRentOfDelegator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentShareAbi,
    functionName: 'harvestRentOfDelegator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateRentShareInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentShareAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const useSimulateRentShareOnErc721Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentShareAbi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateRentSharePause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentShareAbi,
    functionName: 'pause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"resetDelegate"`
 */
export const useSimulateRentShareResetDelegate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentShareAbi,
    functionName: 'resetDelegate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"resetMaliciousStakerAmount"`
 */
export const useSimulateRentShareResetMaliciousStakerAmount =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentShareAbi,
    functionName: 'resetMaliciousStakerAmount',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"toogleRentWrapper"`
 */
export const useSimulateRentShareToogleRentWrapper =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentShareAbi,
    functionName: 'toogleRentWrapper',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateRentShareUnpause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentShareAbi,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"updatePropertyToRentClaimDuration"`
 */
export const useSimulateRentShareUpdatePropertyToRentClaimDuration =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentShareAbi,
    functionName: 'updatePropertyToRentClaimDuration',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"updateRewardPerMonth"`
 */
export const useSimulateRentShareUpdateRewardPerMonth =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentShareAbi,
    functionName: 'updateRewardPerMonth',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"upgradeTo"`
 */
export const useSimulateRentShareUpgradeTo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentShareAbi,
    functionName: 'upgradeTo',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useSimulateRentShareUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentShareAbi,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rentShareAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateRentShareWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rentShareAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentShareAbi}__
 */
export const useWatchRentShareEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: rentShareAbi },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentShareAbi}__ and `eventName` set to `"AdminChanged"`
 */
export const useWatchRentShareAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentShareAbi,
    eventName: 'AdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentShareAbi}__ and `eventName` set to `"BeaconUpgraded"`
 */
export const useWatchRentShareBeaconUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentShareAbi,
    eventName: 'BeaconUpgraded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentShareAbi}__ and `eventName` set to `"DelegateeUpdated"`
 */
export const useWatchRentShareDelegateeUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentShareAbi,
    eventName: 'DelegateeUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentShareAbi}__ and `eventName` set to `"Deposit"`
 */
export const useWatchRentShareDepositEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentShareAbi,
    eventName: 'Deposit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentShareAbi}__ and `eventName` set to `"HarvestRent"`
 */
export const useWatchRentShareHarvestRentEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentShareAbi,
    eventName: 'HarvestRent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentShareAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchRentShareInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentShareAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentShareAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchRentSharePausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentShareAbi,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentShareAbi}__ and `eventName` set to `"PropertyRentClaimDurationUpdated"`
 */
export const useWatchRentSharePropertyRentClaimDurationUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentShareAbi,
    eventName: 'PropertyRentClaimDurationUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentShareAbi}__ and `eventName` set to `"PropertyRentUpdated"`
 */
export const useWatchRentSharePropertyRentUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentShareAbi,
    eventName: 'PropertyRentUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentShareAbi}__ and `eventName` set to `"RentClaimCancelled"`
 */
export const useWatchRentShareRentClaimCancelledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentShareAbi,
    eventName: 'RentClaimCancelled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentShareAbi}__ and `eventName` set to `"RentWrapperToogleUpdated"`
 */
export const useWatchRentShareRentWrapperToogleUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentShareAbi,
    eventName: 'RentWrapperToogleUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentShareAbi}__ and `eventName` set to `"RequestLockForRentClaim"`
 */
export const useWatchRentShareRequestLockForRentClaimEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentShareAbi,
    eventName: 'RequestLockForRentClaim',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentShareAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchRentShareUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentShareAbi,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentShareAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchRentShareUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentShareAbi,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rentShareAbi}__ and `eventName` set to `"Withdraw"`
 */
export const useWatchRentShareWithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rentShareAbi,
    eventName: 'Withdraw',
  })
