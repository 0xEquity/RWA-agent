import { client, parsers } from "@passwordless-id/webauthn";
import {
  AuthenticationResponseJSON,
  CredentialDescriptor,
  RegistrationJSON,
} from "@passwordless-id/webauthn/dist/esm/types";
// Import ethers v6 utilities
import { keccak256, toBeHex, toBigInt } from "ethers";

import { WebAuthnUtils } from "./utils/WebAuthnUtils";
import { DateTime } from "luxon";
import { randomChallenge } from "@passwordless-id/webauthn/dist/esm/server";

export interface IWebAuthnClient {
  register(challenge: string, name?: string, domain?: string): Promise<RegistrationJSON>;
  authenticate(
    challenge: string,
    keyid?: string[],
    transports?: AuthenticatorTransport[],
  ): Promise<AuthenticationResponseJSON>;
}

export interface PassKeySignature {
  id: bigint;
  r: bigint;
  s: bigint;
  authData: Uint8Array;
  clientDataPrefix: string;
  clientDataSuffix: string;
}

export class PassKeyKeyPair {
  keyHash: bigint;
  pubKeyX: bigint;
  pubKeyY: bigint;
  keyId: string;
  webAuthnClient: IWebAuthnClient;
  name?: string;
  aaguid?: string;
  manufacturer?: string;
  regTime?: EpochTimeStamp;
  regData?: RegistrationJSON;

  constructor(
    keyId: string,
    pubKeyX: bigint,
    pubKeyY: bigint,
    webAuthnClient: IWebAuthnClient,
    name?: string,
    aaguid?: string,
    manufacturer?: string,
    regTime?: EpochTimeStamp,
    regData?: RegistrationJSON,
  ) {
    // In ethers v6, keccak256 directly accepts Uint8Array and returns a hex string
    const keyBytes = new TextEncoder().encode(keyId);
    const keyHashHex = keccak256(keyBytes);
    this.keyHash = toBigInt(keyHashHex);
    
    this.pubKeyX = pubKeyX;
    this.pubKeyY = pubKeyY;
    this.webAuthnClient = webAuthnClient;
    this.keyId = keyId;
    this.name = name;
    this.aaguid = aaguid;
    this.manufacturer = manufacturer;
    this.regTime = regTime;
    this.regData = regData;
  }

  // : Promise<PassKeySignature>
  async signChallenge(challenge: string) {
    // ophash is a keccak256 hash of the user operation as a hex string
    // this needs to be base64url encoded from raw bytes of the hash
   
    const authData = await this.webAuthnClient.authenticate(challenge,
       [
      this.keyId,
    ]);

    return authData;
  }

  static revivePassKeyPair = (x: any, waw: IWebAuthnClient): PassKeyKeyPair => {
    return new PassKeyKeyPair(
      x.keyId,
      toBigInt(x.pubKeyX),  // Convert to bigint for ethers v6
      toBigInt(x.pubKeyY),  // Convert to bigint for ethers v6
      waw,
      x.name,
      x.aaguid,
      x.manufacturer,
      x.regTime,
    );
  };
}

export class WebAuthnWrapper implements IWebAuthnClient {
  constructor() {}

  async register(challenge: string, name?: string): Promise<RegistrationJSON> {
    
    return client.register({
      user: {
        name: name ? name : randomChallenge(),
        displayName: name,
        id: name ? name+`-${DateTime.now().toSeconds()}` : randomChallenge(),
      },
      challenge,
      attestation: true,
      userVerification: "required",
      domain: '0xequity.com',
      timeout: 6000,
    });
  }
  async authenticate(
    challenge: string,
    //globalPassKeyDomain = true,
    keyid?: string[] | undefined,
    transports?: AuthenticatorTransport[],
  ): Promise<AuthenticationResponseJSON> {
    return client.authenticate({
      challenge: challenge,
      userVerification: "required",
      allowCredentials: keyid!.map(x => ({id: x, transports: transports})) as CredentialDescriptor[] ,
      domain: "0xequity.com",
      timeout: 6000,
    });
  }

  public async registerPassKey(
    payload: string,
    name?: string
  ): Promise<PassKeyKeyPair> {
    const regData = await this.register(payload, name);
    const parsedData = parsers.parseRegistration(regData);
    let pkey = await WebAuthnUtils.getPublicKeyFromBytes(
      parsedData.credential.publicKey,
    );

    return new PassKeyKeyPair(
      parsedData.credential.id,
      pkey[0],
      pkey[1],
      this,
      name,
      parsedData.authenticator.aaguid,
      parsedData.authenticator.name,
      Date.now(),
      regData,
    );
  }

  public async parseRegisterPassKey(
    regData: any,
    name?: string,
  ): Promise<PassKeyKeyPair> {
    const parsedData = parsers.parseRegistration(regData);

    let pkey = await WebAuthnUtils.getPublicKeyFromBytes(
      parsedData.credential.publicKey,
    );

    return new PassKeyKeyPair(
      parsedData.credential.id,
      pkey[0],
      pkey[1],
      this,
      name,
      parsedData.authenticator.aaguid,
      parsedData.authenticator.name,
      Date.now(),
      regData,
    );
  }
}
