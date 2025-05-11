export const Passkey_Factory_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AccessDenied",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidContractSignature",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSignature",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSignatureLength",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSigner",
    type: "error",
  },
  {
    inputs: [],
    name: "IsNotPaused",
    type: "error",
  },
  {
    inputs: [],
    name: "IsPaused",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "item",
        type: "string",
      },
    ],
    name: "RegistryItemMissing",
    type: "error",
  },
  {
    inputs: [],
    name: "UndefinedAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "paramName",
        type: "string",
      },
    ],
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
        name: "oldBridge",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newBridge",
        type: "address",
      },
    ],
    name: "BridgeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "EIP712DomainChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IPasskeyWalletDeployer",
        name: "oldPasskeyWalletDeployer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IPasskeyWalletDeployer",
        name: "newPasskeyWalletDeployer",
        type: "address",
      },
    ],
    name: "PasskeyWalletDeployerUpdated",
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
        internalType: "uint256",
        name: "newCooldownPeriod",
        type: "uint256",
      },
    ],
    name: "RecoveryCooldownPeriodUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "recoveryModule",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "oldWhitelistStatus",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "newWhitelistStatus",
        type: "bool",
      },
    ],
    name: "RecoveryModuleWhitelistUpdated",
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
        indexed: false,
        internalType: "bool",
        name: "oldStatus",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "newStatus",
        type: "bool",
      },
    ],
    name: "UpdatedClientWhitelist",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldPasskeyWalletDeployer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newPasskeyWalletDeployer",
        type: "address",
      },
    ],
    name: "UpdatedPasskeyWalletDeployer",
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
        indexed: true,
        internalType: "address",
        name: "deployer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "deployedWallet",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "emailHash",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "keyId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pubKeyX",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pubKeyY",
        type: "uint256",
      },
    ],
    name: "WalletDeployed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "walletImplementationAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "oldWhitelistStatus",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "newWhitelistStatus",
        type: "bool",
      },
    ],
    name: "WalletImplementationWhitelistUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "MAX_RECOVERY_COOLDOWN_PERIOD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MIN_RECOVERY_COOLDOWN_PERIOD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RECOVERY_COMMUNITY",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_DEPLOY_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "accessController",
    outputs: [
      {
        internalType: "contract IAccessController",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bridge",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "passkeyWalletAddress",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "recoveryHash",
        type: "bytes32",
      },
    ],
    name: "cancelRecovery",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "payload",
        type: "bytes",
      },
    ],
    name: "completeWalletDeploymentEVM",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "emailHash",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "signer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "pubKeyX",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "pubKeyY",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "keyId",
            type: "string",
          },
          {
            internalType: "address",
            name: "accountImplementationAddr",
            type: "address",
          },
        ],
        internalType: "struct IWalletDeploymentStructs.Salt",
        name: "saltDetails",
        type: "tuple",
      },
    ],
    name: "computeAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "emailHash",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "pubKeyX",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "pubKeyY",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "keyId",
                type: "string",
              },
            ],
            internalType: "struct PassKeyId",
            name: "passkeyId",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "ecdsaSigner",
            type: "address",
          },
          {
            internalType: "address",
            name: "recoveryImplementation",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "recoveryEmailsMerkleRoot",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "totalRecoveryEmails",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "accountImplementationAddr",
            type: "address",
          },
          {
            components: [
              {
                internalType: "bytes",
                name: "ecdsaSignature",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "passKeySignature",
                type: "bytes",
              },
            ],
            internalType: "struct PasskeyWalletFactory.Signatures",
            name: "signatures",
            type: "tuple",
          },
        ],
        internalType: "struct PasskeyWalletFactory.AccountDetails",
        name: "accountDetails",
        type: "tuple",
      },
    ],
    name: "createAccount",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "emailHash",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "pubKeyX",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "pubKeyY",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "keyId",
                type: "string",
              },
            ],
            internalType: "struct PassKeyId",
            name: "passkeyId",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "ecdsaSigner",
            type: "address",
          },
          {
            internalType: "address",
            name: "recoveryImplementation",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "recoveryEmailsMerkleRoot",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "totalRecoveryEmails",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "accountImplementationAddr",
            type: "address",
          },
          {
            components: [
              {
                internalType: "bytes",
                name: "ecdsaSignature",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "passKeySignature",
                type: "bytes",
              },
            ],
            internalType: "struct PasskeyWalletFactory.Signatures",
            name: "signatures",
            type: "tuple",
          },
        ],
        internalType: "struct PasskeyWalletFactory.AccountDetails",
        name: "accountDetails",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "bytes[]",
            name: "txns",
            type: "bytes[]",
          },
          {
            internalType: "bytes",
            name: "passkeySignature",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "ecdsaSignature",
            type: "bytes",
          },
        ],
        internalType: "struct PasskeyWalletFactory.BatchTransaction",
        name: "batchTxData",
        type: "tuple",
      },
    ],
    name: "createAccountAndCall",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "dstEid",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "payload",
        type: "bytes",
      },
    ],
    name: "deployWalletOnEVM",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      {
        internalType: "bytes1",
        name: "fields",
        type: "bytes1",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "version",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "verifyingContract",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "uint256[]",
        name: "extensions",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "emailToSaltToPasskeywallet",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSystemRegistry",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
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
      {
        internalType: "contract IPasskeyWalletDeployer",
        name: "_passkeyWalletDeployer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_recoveryCoolDownPeriod",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isDeployedFromHere",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "walletAddress",
        type: "address",
      },
    ],
    name: "isKycdForRecovery",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recoveryModule",
        type: "address",
      },
    ],
    name: "isRecoveryModuleWhitelisted",
    outputs: [
      {
        internalType: "bool",
        name: "isWhitelisted",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "walletImplementations",
        type: "address",
      },
    ],
    name: "isWalletImplementationWhitelisted",
    outputs: [
      {
        internalType: "bool",
        name: "isWhitelisted",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "passkeyWalletDeployer",
    outputs: [
      {
        internalType: "contract IPasskeyWalletDeployer",
        name: "",
        type: "address",
      },
    ],
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
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "recoveryCoolDownPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
      {
        internalType: "address",
        name: "newBridgeAddress",
        type: "address",
      },
    ],
    name: "updateBridge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newSigner",
        type: "address",
      },
    ],
    name: "updatePasskeySigner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newPasskeyWalletDeployer",
        type: "address",
      },
    ],
    name: "updatePasskeyWalletDeployer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newCooldownPeriod",
        type: "uint256",
      },
    ],
    name: "updateRecoveryCooldownPeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
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
        name: "passkeyWallet",
        type: "address",
      },
    ],
    name: "userToWalletDeploymentInitParams",
    outputs: [
      {
        internalType: "bytes",
        name: "emailHash",
        type: "bytes",
      },
      {
        internalType: "string",
        name: "keyId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "pubKeyX",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pubKeyY",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "ecdsaSigner",
        type: "address",
      },
      {
        internalType: "address",
        name: "accountImplementationAddr",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recoveryModule",
        type: "address",
      },
      {
        internalType: "bool",
        name: "flag",
        type: "bool",
      },
    ],
    name: "whitelistRecoveryModule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "walletNewImplementation",
        type: "address",
      },
      {
        internalType: "bool",
        name: "flag",
        type: "bool",
      },
    ],
    name: "whitelistWalletNewImplementation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
