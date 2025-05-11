import { BigNumber } from "bignumber.js";

export const MaxUint256 = new BigNumber(
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
);

export const DIRECTUS_API = {
    INDEXER_URL: "https://hasura.0xequity.com/v1/graphql",
    USER_NOT_EXIST: 'https://directus.0xequity.com/flows/trigger/1c984de3-d4c4-44a2-87a0-591143bb8db5',
    DEVICES: "https://directus.0xequity.com/flows/trigger/bfb27117-9b7c-442b-9365-72d66c53f6a0",
    KYC_SUBMIT: "https://directus.0xequity.com/flows/trigger/3a96aea6-b394-459b-9f19-7b715d57f19c",
    SIGNUP_HOOK:
      "https://directus.0xequity.com/flows/trigger/bec25aac-5465-4446-a78e-ec2c10c1b2f8",
    BOUNCE_CHECK:
      "https://directus.0xequity.com/flows/trigger/57f5a312-5c1b-4293-a1bb-7555422890d9",
    DElETE_ACCOUNT:
      "https://directus.0xequity.com/flows/trigger/5dff261b-e158-4fe1-814c-54bce491ed08",
    EMAIL_VERIFICATION_HOOK:
      "https://directus.0xequity.com/flows/trigger/9b95edb3-7457-4250-ac64-aae1c3160585",
    ADD_PHONE_NUMBER_HOOK:
      "https://directus.0xequity.com/flows/trigger/d49f2606-bd05-434b-9d80-d6dc4c0b8396",
    URL_SHORTER:
      "https://directus.0xequity.com/flows/trigger/0c3c5706-893f-4e6b-bc3b-b72adf7157aa",
    GET_SHORTER:
      "https://directus.0xequity.com/flows/trigger/36809b87-9df0-4bed-b138-6a28b28c1857",
    ADD_NEW_DEVICE:"https://directus.0xequity.com/flows/trigger/f6f6edf4-66d5-449d-b2cb-91e0ac1852f7",
    
    RECOVERY_REQUESTS: "https://directus.0xequity.com/flows/trigger/84edc32d-766c-4c04-97d6-02b0c188b5ad",
    RESEND_EMAIL_VERIFICATION_HOOK:
      "https://directus.0xequity.com/flows/trigger/a0c86f9b-17b1-46d7-b7c0-060e8852f5ea",
    RESEND_PHONE_VERIFICATION_HOOK:
      "https://directus.0xequity.com/flows/trigger/72f40f3b-b8c8-430a-8344-1f1cf7e9c095",
  
    PHONE_VERIFICATION_HOOK:
      "https://directus.0xequity.com/flows/trigger/4938e5ac-aa19-4bd9-bbbd-94d8e01e5d9b",
    KYC_DATA_HOOK:
      "https://directus.0xequity.com/flows/trigger/31c59159-57bb-4364-9adc-4f02ea230efe",
    REGISTER_WALLET_HOOK:
      "https://directus.0xequity.com/flows/trigger/1f5d0cbf-c0a1-4664-9cfd-efa9c67f37dd",
    LOGIN_WALLET_HOOK:
      "https://directus.0xequity.com/flows/trigger/bcca7668-bcc2-43e0-b2a3-e2d9630579d5",
    PARSE_KEY:
      "https://directus.0xequity.com/flows/trigger/a700e1ef-8c5c-41da-b18b-26f8b0fe69b0",
    RELAYER:
      "https://directus.0xequity.com/flows/trigger/42bced1f-e4cc-4e90-9c11-84c9abfb6e5e",
    TRANSACTION_DECODER:
      "https://directus.0xequity.com/flows/trigger/25e5b220-8ee4-4ca4-a87b-7fc243e76223",
    KAZM_LOGIN:
      "https://directus.0xequity.com/flows/trigger/f181b507-8fd5-4c3f-9c12-3a167c904fba",
    NOVU_FCM:
      "https://directus.0xequity.com/flows/trigger/abf21e3a-4d0a-471c-a88d-5182c1599632",
    KYC_STATUS:
      "https://directus.0xequity.com/flows/trigger/e28b5d3f-ca81-41f9-99a7-a8bea942c2c6",
    WHOAMI:
      "https://directus.0xequity.com/flows/trigger/6f48bc21-3a18-4e7a-b25f-4abd351afd07",
    USER_PASSKEYS :
      "https://directus.0xequity.com/flows/trigger/a3124f8b-9487-430f-ba44-821f050efb59",
    MIGRATE_WALLET: 
      'https://directus.0xequity.com/flows/trigger/9385dc10-7833-4668-b8b9-40c9398db7a9',
    USERS:
      "https://directus.0xequity.com/flows/trigger/c42c80c7-8ee3-4401-a6a2-026830328cd4"
  };
  
  export const DEFENDER_API = {
    FAUCET:
      "https://api.defender.openzeppelin.com/actions/d2b913f2-23e4-4562-a0a6-78ab69c3e91c/runs/webhook/dd058bd6-bd1e-477f-a091-54acca848c6a/KdMuyP7rGLcdZqsED1r4TD",
  };
  
  export const HASURA_API = {
    TRANSACTION_INFO: "https://hasura.0xequity.com/api/rest/get_transaction_info",
  };
  export const ORDERBOOK_API = {
    CREATE: "https://dex-v2.0xequity.com/orders/validate",
  };
  export type T_LANGUAGE_ITEM = {
    key: string;
    name: string;
    symbol: string;
  };
  
  export type T_CURRENCY_ITEM = {
    key: string;
    name: string;
    symbol: string;
  };
  
  export const appLanguages: T_LANGUAGE_ITEM[] = [
    {
      key: "en",
      name: "English",
      symbol: "EN",
    },
    {
      key: "tr",
      name: "Turkish",
      symbol: "Türkçe",
    },
  ];
  
  export const appCurrencies: T_CURRENCY_ITEM[] = [
    {
      key: "en",
      name: "United State Dollar",
      symbol: "USD",
    },
    {
      key: "eu",
      name: "Euro",
      symbol: "EUR",
    },
    {
      key: "tr",
      name: "Turkish Lira",
      symbol: "TRY",
    },
  ];
  
  const IMAGE_BASE_URL = "https://0xequity-properties.s3.us-west-2.amazonaws.com";
  
  export const overViewImages = [
    {
      key: "1",
      blurThumbnail: `${IMAGE_BASE_URL}/wxefr3/1-360x240-blur.jpg`,
      thumbmail: `${IMAGE_BASE_URL}/wxefr3/1-360x240.jpg`,
      originalBlur: `${IMAGE_BASE_URL}/wxefr3/1-blur.jpg`,
      original: `${IMAGE_BASE_URL}/wxefr3/1-980x652.jpg`,
    },
    {
      key: "2",
      blurThumbnail: `${IMAGE_BASE_URL}/wxefr3/2-360x240-blur.jpg`,
      thumbmail: `${IMAGE_BASE_URL}/wxefr3/2-360x240.jpg`,
      originalBlur: `${IMAGE_BASE_URL}/wxefr3/2-blur.jpg`,
      original: `${IMAGE_BASE_URL}/wxefr3/2-980x652.jpg`,
    },
    {
      key: "3",
      blurThumbnail: `${IMAGE_BASE_URL}/wxefr3/3-360x240-blur.jpg`,
      thumbmail: `${IMAGE_BASE_URL}/wxefr3/3-360x240.jpg`,
      originalBlur: `${IMAGE_BASE_URL}/wxefr3/3-blur.jpg`,
      original: `${IMAGE_BASE_URL}/wxefr3/3-980x652.jpg`,
    },
    {
      key: "4",
      blurThumbnail: `${IMAGE_BASE_URL}/wxefr3/4-360x240-blur.jpg`,
      thumbmail: `${IMAGE_BASE_URL}/wxefr3/4-360x240.jpg`,
      originalBlur: `${IMAGE_BASE_URL}/wxefr3/4-blur.jpg`,
      original: `${IMAGE_BASE_URL}/wxefr3/4-980x652.jpg`,
    },
    {
      key: "5",
      blurThumbnail: `${IMAGE_BASE_URL}/wxefr3/5-360x240-blur.jpg`,
      thumbmail: `${IMAGE_BASE_URL}/wxefr3/5-360x240.jpg`,
      originalBlur: `${IMAGE_BASE_URL}/wxefr3/5-blur.jpg`,
      original: `${IMAGE_BASE_URL}/wxefr3/5-980x652.jpg`,
    },
    {
      key: "6",
      blurThumbnail: `${IMAGE_BASE_URL}/wxefr3/6-360x240-blur.jpg`,
      thumbmail: `${IMAGE_BASE_URL}/wxefr3/6-360x240.jpg`,
      originalBlur: `${IMAGE_BASE_URL}/wxefr3/6-blur.jpg`,
      original: `${IMAGE_BASE_URL}/wxefr3/6-980x652.jpg`,
    },
    {
      key: "7",
      blurThumbnail: `${IMAGE_BASE_URL}/wxefr3/7-360x240-blur.jpg`,
      thumbmail: `${IMAGE_BASE_URL}/wxefr3/7-360x240.jpg`,
      originalBlur: `${IMAGE_BASE_URL}/wxefr3/7-blur.jpg`,
      original: `${IMAGE_BASE_URL}/wxefr3/7-980x652.jpg`,
    },
    {
      key: "8",
      blurThumbnail: `${IMAGE_BASE_URL}/wxefr3/8-360x240-blur.jpg`,
      thumbmail: `${IMAGE_BASE_URL}/wxefr3/8-360x240.jpg`,
      originalBlur: `${IMAGE_BASE_URL}/wxefr3/8-blur.jpg`,
      original: `${IMAGE_BASE_URL}/wxefr3/8-980x652.jpg`,
    },
    {
      key: "10",
      blurThumbnail: `${IMAGE_BASE_URL}/wxefr3/10-360x240-blur.jpg`,
      thumbmail: `${IMAGE_BASE_URL}/wxefr3/10-360x240.jpg`,
      originalBlur: `${IMAGE_BASE_URL}/wxefr3/10-blur.jpg`,
      original: `${IMAGE_BASE_URL}/wxefr3/10-980x652.jpg`,
    },
    {
      key: "11",
      blurThumbnail: `${IMAGE_BASE_URL}/wxefr3/11-360x240-blur.jpg`,
      thumbmail: `${IMAGE_BASE_URL}/wxefr3/11-360x240.jpg`,
      originalBlur: `${IMAGE_BASE_URL}/wxefr3/11-blur.jpg`,
      original: `${IMAGE_BASE_URL}/wxefr3/11-980x652.jpg`,
    },
    {
      key: "12",
      blurThumbnail: `${IMAGE_BASE_URL}/wxefr3/12-360x240-blur.jpg`,
      thumbmail: `${IMAGE_BASE_URL}/wxefr3/12-360x240.jpg`,
      originalBlur: `${IMAGE_BASE_URL}/wxefr3/12-blur.jpg`,
      original: `${IMAGE_BASE_URL}/wxefr3/12-980x652.jpg`,
    },
  ];
  
  export const APP_NAME = "0xequity App";
  