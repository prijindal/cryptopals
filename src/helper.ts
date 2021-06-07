export const splitBuffer = (buf: Buffer, length: number): Array<Buffer> => {
  const fileContentSplit = [];
  let bytes = buf;
  while (bytes.length > 0) {
    fileContentSplit.push(bytes.subarray(0, length));
    bytes = bytes.subarray(length);
  }
  return fileContentSplit;
};
