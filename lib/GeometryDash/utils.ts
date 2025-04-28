import * as CG from "../utils";
import * as b64 from "url-safe-base64";

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
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += String.fromCharCode(
      str.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return result;
}

export function B64Enc(data: string) {
  return b64.encode(btoa(data))
}
export function B64Dec(data: string) {
  return atob(b64.decode(data))
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
