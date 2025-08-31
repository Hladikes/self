// src/constants/constants.ts
var MAX_BYTES_IN_FIELD = 31;

// src/utils/bytes.ts
function bigIntToChunkedBytes(num, bytesPerChunk, numChunks) {
  const res = [];
  const bigintNum = typeof num == "bigint" ? num : num.valueOf();
  const msk = (1n << BigInt(bytesPerChunk)) - 1n;
  for (let i = 0; i < numChunks; ++i) {
    res.push((bigintNum >> BigInt(i * bytesPerChunk) & msk).toString());
  }
  return res;
}
function bytesToBigDecimal(arr) {
  let result = BigInt(0);
  for (let i = 0; i < arr.length; i++) {
    result = result * BigInt(256) + BigInt(arr[i] & 255);
  }
  return result.toString();
}
function computeIntChunkLength(byteLength) {
  const packSize = MAX_BYTES_IN_FIELD;
  const remain = byteLength % packSize;
  let numChunks = (byteLength - remain) / packSize;
  if (remain > 0) {
    numChunks += 1;
  }
  return numChunks;
}
function derToBytes(derValue) {
  const bytes = [];
  for (let i = 0; i < derValue.length; i++) {
    bytes.push(derValue.charCodeAt(i));
  }
  return bytes;
}
function hexStringToSignedIntArray(hexString) {
  const result = [];
  for (let i = 0; i < hexString.length; i += 2) {
    const byte = parseInt(hexString.substr(i, 2), 16);
    result.push(byte > 127 ? byte - 256 : byte);
  }
  return result;
}
function hexToBin(n) {
  let bin = Number(`0x${n[0]}`).toString(2);
  for (let i = 1; i < n.length; i += 1) {
    bin += Number(`0x${n[i]}`).toString(2).padStart(4, "0");
  }
  return bin;
}
function hexToDecimal(hex) {
  return BigInt(`0x${hex}`).toString();
}
function hexToSignedBytes(hexString) {
  const bytes = [];
  for (let i = 0; i < hexString.length - 1; i += 2) {
    const byte = parseInt(hexString.substr(i, 2), 16);
    bytes.push(byte >= 128 ? byte - 256 : byte);
  }
  return bytes;
}
function num2Bits(n, inValue) {
  const out = new Array(n).fill(BigInt(0));
  let lc1 = BigInt(0);
  let e2 = BigInt(1);
  for (let i = 0; i < n; i++) {
    out[i] = inValue >> BigInt(i) & BigInt(1);
    if (out[i] !== BigInt(0) && out[i] !== BigInt(1)) {
      throw new Error("Bit value is not binary.");
    }
    lc1 += out[i] * e2;
    e2 = e2 << BigInt(1);
  }
  if (lc1 !== inValue) {
    throw new Error("Reconstructed value does not match the input.");
  }
  return out;
}
function packBytes(unpacked) {
  const bytesCount = [31, 31, 31];
  const packed = [0n, 0n, 0n];
  let byteIndex = 0;
  for (let i = 0; i < bytesCount.length; i++) {
    for (let j = 0; j < bytesCount[i]; j++) {
      if (byteIndex < unpacked.length) {
        packed[i] |= BigInt(unpacked[byteIndex]) << BigInt(j) * 8n;
      }
      byteIndex++;
    }
  }
  return packed;
}
function packBytesArray(unpacked) {
  const packSize = MAX_BYTES_IN_FIELD;
  const maxBytes = unpacked.length;
  const maxInts = computeIntChunkLength(maxBytes);
  const out = new Array(maxInts).fill(0n);
  for (let i = 0; i < maxInts; i++) {
    let sum = 0n;
    for (let j = 0; j < packSize; j++) {
      const idx = packSize * i + j;
      if (idx >= maxBytes) {
        continue;
      } else if (j === 0) {
        sum = BigInt(unpacked[idx]);
      } else {
        sum += (1n << BigInt(8 * j)) * BigInt(unpacked[idx]);
      }
    }
    out[i] = sum;
  }
  return out;
}
function splitToWords(number, wordsize, numberElement) {
  let t = number;
  const words = [];
  for (let i = 0; i < numberElement; ++i) {
    const baseTwo = BigInt(2);
    words.push(`${t % BigInt(Math.pow(Number(baseTwo), wordsize))}`);
    t = BigInt(t / BigInt(Math.pow(Number(BigInt(2)), wordsize)));
  }
  if (!(t == BigInt(0))) {
    throw `Number ${number} does not fit in ${(wordsize * numberElement).toString()} bits`;
  }
  return words;
}
var toBinaryString = (byte) => {
  const binary = (parseInt(byte, 10) & 255).toString(2).padStart(8, "0");
  return binary;
};
function toSigned(byte) {
  return byte > 127 ? byte - 256 : byte;
}
function toUnsigned(byte) {
  return byte & 255;
}
function toUnsignedByte(signedByte) {
  return signedByte < 0 ? signedByte + 256 : signedByte;
}
export {
  bigIntToChunkedBytes,
  bytesToBigDecimal,
  computeIntChunkLength,
  derToBytes,
  hexStringToSignedIntArray,
  hexToBin,
  hexToDecimal,
  hexToSignedBytes,
  num2Bits,
  packBytes,
  packBytesArray,
  splitToWords,
  toBinaryString,
  toSigned,
  toUnsigned,
  toUnsignedByte
};
//# sourceMappingURL=bytes.js.map