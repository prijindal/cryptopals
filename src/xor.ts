export const bufferXor = function xor(a: Buffer, b: Buffer): Buffer {
  const length = Math.max(a.length, b.length);
  const buffer = Buffer.allocUnsafe(length);

  for (let i = 0; i < length; ++i) {
    buffer[i] = a[i] ^ b[i];
  }

  return buffer;
};

export const hexXor = (hex1: string, hex2: string): string => {
  const hex1Buffer = Buffer.from(hex1, "hex");
  const hex2Buffer = Buffer.from(hex2, "hex");
  const xorBuffer = bufferXor(hex1Buffer, hex2Buffer);
  return xorBuffer.toString("hex");
};
