import aesjs from "aes-js";
import { bufferXor } from "./xor";
import { splitBuffer } from "./helper";
import { pkcs7Padding } from "./pkcs7";

export const cbcEncrypt = (
  buf: Buffer,
  key: Buffer,
  iv: Buffer,
  length: number = 16
): Buffer => {
  const splited = splitBuffer(buf, length);
  let encrypted = Buffer.alloc(0);
  let currentBlock = pkcs7Padding(iv, length);
  const aesEcb = new aesjs.ModeOfOperation.ecb(key);
  for (const plaintext of splited) {
    const paddedPlaintext = pkcs7Padding(plaintext, length);
    const blockXored = bufferXor(paddedPlaintext, currentBlock);
    const blockEncrypted = aesEcb.encrypt(blockXored);
    encrypted = Buffer.concat([encrypted, blockEncrypted]);
    currentBlock = Buffer.from(blockEncrypted);
  }
  return encrypted;
};

export const cbcDecrypt = (
  buf: Buffer,
  key: Buffer,
  iv: Buffer,
  length: number = 16
): Buffer => {
  const splited = splitBuffer(buf, length);
  let currentBlock = pkcs7Padding(iv, length);
  const plaintexts: Array<Buffer> = [];
  const aesEcb = new aesjs.ModeOfOperation.ecb(key);
  for (const blockEncrypted of splited) {
    const blockXored = aesEcb.decrypt(blockEncrypted);
    const plaintext = bufferXor(Buffer.from(blockXored), currentBlock);
    plaintexts.push(plaintext);
    currentBlock = blockEncrypted;
  }
  let decrypted = Buffer.concat(plaintexts);
  const padding = decrypted[decrypted.length - 1];
  if (padding < length) {
    decrypted = decrypted.subarray(0, decrypted.length - padding);
  }
  return decrypted;
};
