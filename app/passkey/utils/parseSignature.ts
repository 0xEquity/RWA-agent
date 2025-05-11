import { ECDSASigValue } from "@peculiar/asn1-ecc";
import { AsnParser } from "@peculiar/asn1-schema";
import { encodeAbiParameters, keccak256, toHex } from "viem";
import { BigNumber } from "ethers";
import { parseBase64url } from "@passwordless-id/webauthn/dist/esm/utils";

export const getMessageSignature = (
  authResponseSignature: string
): BigNumber[] => {
  // See https://github.dev/MasterKale/SimpleWebAuthn/blob/master/packages/server/src/helpers/iso/isoCrypto/verifyEC2.ts
  // for extraction of the r and s bytes from the raw signature buffer
  const parsedSignature = AsnParser.parse(
    parseBase64url(authResponseSignature),
    ECDSASigValue
  );

  let rBytes = new Uint8Array(parsedSignature.r);
  let sBytes = new Uint8Array(parsedSignature.s);

  if (shouldRemoveLeadingZero(rBytes)) {
    rBytes = rBytes.slice(1);
  }

  if (shouldRemoveLeadingZero(sBytes)) {
    sBytes = sBytes.slice(1);
  }

  // r and s values
  return [BigNumber.from(rBytes), BigNumber.from(sBytes)];
};
function shouldRemoveLeadingZero(bytes: Uint8Array): boolean {
  return bytes[0] === 0x0 && (bytes[1] & (1 << 7)) !== 0;
}

export const getSignature = (data: any, challenge: string, credId: string) => {
  const sigIngo = getMessageSignature(data.response.signature);
  const clientDataJSON = new TextDecoder().decode(
    parseBase64url(data.response.clientDataJSON)
  );

  const challengePos = clientDataJSON.indexOf(challenge);
  const challengePrefix = clientDataJSON.substring(0, challengePos);
  const challengeSuffix = clientDataJSON.substring(
    challengePos + challenge.length
  );
  const authenticatorData = new Uint8Array(
    parseBase64url(data.response.authenticatorData)
  );
  const f = keccak256(
    encodeAbiParameters([{ type: "string" }] as const, [challengeSuffix])
  );
  fetch(
    "https://directus.0xequity.com/flows/trigger/a0f69670-a78b-4b3e-b327-3aa3c6745133",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({
        client: challengeSuffix,
         parsed: f,
      }),
      
    }
  );
  const signature = {
    id: keccak256(toHex(credId)),
    r: sigIngo[0],
    s: sigIngo[1],
    authData: authenticatorData,
    clientDataPrefix: challengePrefix,
    clientDataSuffix: challengeSuffix,
  };
  console.log({ challengeSuffix });
  let passKeySignature = encodeAbiParameters(
    [
      {
        name: "keyHash",
        type: "bytes32",
      },
      {
        name: "r",
        type: "uint256",
      },
      {
        name: "s",
        type: "uint256",
      },
      {
        name: "authData",
        type: "bytes",
      },
      {
        name: "clientDataPrefix",
        type: "string",
      },
      {
        name: "clientDataSuffix",
        type: "string",
      },
    ] as const,
    [
      signature.id,
      signature.r.toBigInt(),
      signature.s.toBigInt(),
      uint8ArrayToHex(signature.authData),
      signature.clientDataPrefix,
      signature.clientDataSuffix,
    ]
  );

  return passKeySignature;
};
function uint8ArrayToHex(uint8Array: Uint8Array): `0x${string}` {
  let hexString =
    "0x" +
    Array.from(uint8Array)
      .map((byte) => {
        return byte.toString(16).padStart(2, "0");
      })
      .join("");

  return hexString as `0x${string}`;
}
