import base64url from "base64url";
import { BigNumber } from "ethers";

export class WebAuthnUtils {
  static async getPublicKeyFromBytes(
    publicKeyBytes: string,
  ): Promise<BigNumber[]> {
    const cap = {
      name: "ECDSA",
      namedCurve: "P-256",
      hash: "SHA-256",
    };
    let pkeybytes = base64url.toBuffer(publicKeyBytes);
    let pkey = await crypto.subtle.importKey("spki", pkeybytes, cap, true, [
      "verify",
    ]);
    let jwk = await crypto.subtle.exportKey("jwk", pkey);

    if (jwk.x && jwk.y)
      return [
        BigNumber.from(base64url.toBuffer(jwk.x)),
        BigNumber.from(base64url.toBuffer(jwk.y)),
      ];
    else throw new Error("Invalid public key");
  }
}
