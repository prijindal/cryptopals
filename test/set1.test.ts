import { hexToBase64 } from "../src/base64";
import { hexXor } from "../src/xor";

describe("hexToBase64 test", () => {
  it("Sample hex test", () => {
    expect(
      hexToBase64(
        "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d"
      )
    ).toEqual(
      "SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t"
    );
  });
});

describe("hexXor test", () => {
  it("Sample hex test", () => {
    expect(
      hexXor(
        "1c0111001f010100061a024b53535009181c",
        "686974207468652062756c6c277320657965"
      )
    ).toEqual("746865206b696420646f6e277420706c6179");
  });
});
