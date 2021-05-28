import { hexToBase64 } from "../src/base64";
import { hexXor } from "../src/xor";
import { hexSingleByteXorDecipher, scoreUtfString } from "../src/singleByteXor";
import { xorEachLine } from "../src/xorFile";

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

describe("Deciher singleByteXorCipher", () => {
  it("Scoring function", () => {
    expect(scoreUtfString("Ieeacdm*GI-y*fcao*k*zedn*el*hkied")).toBeGreaterThan(
      scoreUtfString("Cooking MC's like a pound of bacon")
    );
    expect(scoreUtfString("Yuuqst}:WY=i:vsq:{:juot~:u|:x{yut")).toBeGreaterThan(
      scoreUtfString("Cooking MC's like a pound of bacon")
    );
    expect(scoreUtfString("zmSmH�IReCWKn@dGfSjeMr")).toBeGreaterThan(
      scoreUtfString("Now that the party is jumping\n")
    );
    expect(scoreUtfString("xoQoJKPgAUIlBfEdQhgOp")).toBeGreaterThan(
      scoreUtfString("Now that the party is jumping\n")
    );
  });
  it("Sample hex test", () => {
    expect(
      hexSingleByteXorDecipher(
        "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736"
      )
    ).toEqual("Cooking MC's like a pound of bacon");
  });
});

describe("Detect single-character XOR in a file", () => {
  it("Sample hex test", () => {
    expect(xorEachLine("test/4.txt")).toEqual(
      "Now that the party is jumping\n"
    );
  });
});
