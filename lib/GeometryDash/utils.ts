import * as CG from "../utils";

import crypto from "crypto";

export function splitPos(str: string, pos: number) {
  //Check if string pos is within length and split and return [string, string]
  if (str.length > pos){
    return [str.slice(0, pos), str.slice(pos)];
  } else {
    throw new Error("Position out of bounds");
  }
}

export function XOR(str: string, key: string) {
  const buffer = Buffer.from(str);
  const keyBuffer = Buffer.from(key);
  return buffer.map((byte, i) => byte ^ keyBuffer[i % key.length]!).toString();

}

export function B64urlEnc(data: string) {
  return Buffer.from(data).toString('base64url')
}
export function B64urlDec(data: string) {
  return Buffer.from(data, 'base64url').toString()
}

export function B64Enc(data: string) {
  return Buffer.from(data).toString('base64')
}
export function B64Dec(data: string) {
  return Buffer.from(data, 'base64').toString()
}

export function SHA1(str: string) {
  return CG.SHA1(str).toHex()
}

export function saltedSHA1(str: string, salt: string) {
  return SHA1(str + salt)
}

export function MD5(str: string) {
  return CG.MD5(str).toHex()
}

export function generateRS(n = 10) {
  // const random = Array.from(crypto.randomBytes(n).map(byte => byte % 62)); // prone to modulo bias
  const random = Array.from({ length: n }, () => crypto.randomInt(0, 62));
  const out_space: [start: number, end: number, offset: number][] = [
    [0, 10, 48], //0 - 9
    [10, 36, 65], //A - Z
    [36, 62, 97], //a - z
  ];
  return random
    .map((byte) => {
      for (const [start, end, offset] of out_space)
        if (byte < end) return String.fromCharCode(offset + byte - start);
    })
    .join("");
}

export function generateUUID() {
  return crypto.randomUUID().toString()
}
