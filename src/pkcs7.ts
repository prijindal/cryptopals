export const pkcs7Padding = (buf: Buffer, length: number): Buffer => {
  let finalLength = buf.length;
  if (finalLength % length != 0) {
    finalLength += length - (finalLength % length);
  }
  const b = Buffer.alloc(finalLength);
  for (let index = 0; index < buf.length; index++) {
    b[index] = buf[index];
  }
  for (let index = buf.length; index < finalLength; index++) {
    b[index] = length - (buf.length % length);
  }
  return b;
};
