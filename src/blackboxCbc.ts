import crypto from "crypto";
import lodash from "lodash";
import { encryptAesBuffer } from "./aes";
import { cbcEncrypt } from "./cbc";
import { detectAesEcb } from "./detectAes";

export const encryptionOracle = (buf: Buffer, mode: "CBC" | "ECB"): Buffer => {
  const key = crypto.randomBytes(16);
  const randomBytesPrepend = crypto.randomBytes(lodash.random(5, 10));
  const randomBytesAppend = crypto.randomBytes(lodash.random(5, 10));
  buf = Buffer.concat([randomBytesPrepend, buf, randomBytesAppend]);
  let encrypted: Buffer;
  if (mode == "ECB") {
    encrypted = encryptAesBuffer(buf, key);
  } else if (mode == "CBC") {
    const iv = crypto.randomBytes(16);
    encrypted = cbcEncrypt(buf, key, iv);
  }
  return encrypted;
};

export const detectEcbOrCbcFunction = (
  fn: (buf: Buffer) => Buffer
): "ECB" | "CBC" => {
  const input = Buffer.alloc(48);
  for (let index = 0; index < 48; index++) {
    input[index] = 42;
  }
  const encrypted = fn(input);
  return detectAesEcb(encrypted) ? "ECB" : "CBC";
};
