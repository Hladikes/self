// src/utils/passports/passport.ts
import * as forge2 from "node-forge";
import { poseidon5 as poseidon52 } from "poseidon-lite";

// src/constants/constants.ts
var MAX_BYTES_IN_FIELD = 31;
var max_csca_bytes = 1792;
var max_dsc_bytes = 1792;

// src/utils/bytes.ts
function computeIntChunkLength(byteLength) {
  const packSize = MAX_BYTES_IN_FIELD;
  const remain = byteLength % packSize;
  let numChunks = (byteLength - remain) / packSize;
  if (remain > 0) {
    numChunks += 1;
  }
  return numChunks;
}
function hexToSignedBytes(hexString) {
  const bytes = [];
  for (let i = 0; i < hexString.length - 1; i += 2) {
    const byte = parseInt(hexString.substr(i, 2), 16);
    bytes.push(byte >= 128 ? byte - 256 : byte);
  }
  return bytes;
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

// src/utils/hash.ts
import { ethers } from "ethers";
import { sha1 } from "js-sha1";
import { sha224, sha256 } from "js-sha256";
import { sha384, sha512 } from "js-sha512";
import * as forge from "node-forge";
import {
  poseidon1,
  poseidon2,
  poseidon3,
  poseidon4,
  poseidon5,
  poseidon6,
  poseidon7,
  poseidon8,
  poseidon9,
  poseidon10,
  poseidon11,
  poseidon12,
  poseidon13,
  poseidon14,
  poseidon15,
  poseidon16
} from "poseidon-lite";
function customHasher(pubKeyFormatted) {
  if (pubKeyFormatted.length < 16) {
    return flexiblePoseidon(pubKeyFormatted.map(BigInt)).toString();
  } else {
    const rounds = Math.ceil(pubKeyFormatted.length / 16);
    if (rounds > 16) {
      throw new Error("Number of rounds is greater than 16");
    }
    const hash2 = new Array(rounds);
    for (let i = 0; i < rounds; i++) {
      hash2[i] = { inputs: new Array(16).fill(BigInt(0)) };
    }
    for (let i = 0; i < rounds; i++) {
      for (let j = 0; j < 16; j++) {
        if (i * 16 + j < pubKeyFormatted.length) {
          hash2[i].inputs[j] = BigInt(pubKeyFormatted[i * 16 + j]);
        }
      }
    }
    const finalHash = flexiblePoseidon(hash2.map((h) => poseidon16(h.inputs)));
    return finalHash.toString();
  }
}
function flexiblePoseidon(inputs) {
  switch (inputs.length) {
    case 1:
      return poseidon1(inputs);
    case 2:
      return poseidon2(inputs);
    case 3:
      return poseidon3(inputs);
    case 4:
      return poseidon4(inputs);
    case 5:
      return poseidon5(inputs);
    case 6:
      return poseidon6(inputs);
    case 7:
      return poseidon7(inputs);
    case 8:
      return poseidon8(inputs);
    case 9:
      return poseidon9(inputs);
    case 10:
      return poseidon10(inputs);
    case 11:
      return poseidon11(inputs);
    case 12:
      return poseidon12(inputs);
    case 13:
      return poseidon13(inputs);
    case 14:
      return poseidon14(inputs);
    case 15:
      return poseidon15(inputs);
    case 16:
      return poseidon16(inputs);
    default:
      throw new Error(`Unsupported number of inputs: ${inputs.length}`);
  }
}
function hash(hashFunction, bytesArray, format = "bytes") {
  const unsignedBytesArray = bytesArray.map((byte) => byte & 255);
  let hashResult;
  switch (hashFunction) {
    case "sha1":
      hashResult = sha1(unsignedBytesArray);
      break;
    case "sha224":
      hashResult = sha224(unsignedBytesArray);
      break;
    case "sha256":
      hashResult = sha256(unsignedBytesArray);
      break;
    case "sha384":
      hashResult = sha384(unsignedBytesArray);
      break;
    case "sha512":
      hashResult = sha512(unsignedBytesArray);
      break;
    default:
      console.log("\x1B[31m%s\x1B[0m", `${hashFunction} not found in hash`);
      hashResult = sha256(unsignedBytesArray);
  }
  if (format === "hex") {
    return hashResult;
  }
  if (format === "bytes") {
    return hexToSignedBytes(hashResult);
  }
  const actualForgeUtil = forge.util ? forge.util : forge.default.util;
  if (format === "binary") {
    return actualForgeUtil.binary.raw.encode(new Uint8Array(hexToSignedBytes(hashResult)));
  }
  throw new Error(`Invalid format: ${format}`);
}
function packBytesAndPoseidon(unpacked) {
  const packed = packBytesArray(unpacked);
  return customHasher(packed.map(String)).toString();
}

// src/utils/passports/format.ts
function formatMrz(mrz) {
  const mrzCharcodes = [...mrz].map((char) => char.charCodeAt(0));
  if (mrz.length === 88) {
    mrzCharcodes.unshift(88);
    mrzCharcodes.unshift(95, 31);
    mrzCharcodes.unshift(91);
    mrzCharcodes.unshift(97);
  } else if (mrz.length === 90) {
    mrzCharcodes.unshift(90);
    mrzCharcodes.unshift(95, 31);
    mrzCharcodes.unshift(93);
    mrzCharcodes.unshift(97);
  } else {
    throw new Error(`Unsupported MRZ length: ${mrz.length}. Expected 88 or 90 characters.`);
  }
  return mrzCharcodes;
}

// src/utils/trees.ts
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { poseidon2 as poseidon22, poseidon3 as poseidon32, poseidon6 as poseidon62, poseidon10 as poseidon102, poseidon12 as poseidon122, poseidon13 as poseidon132 } from "poseidon-lite";
import { IMT } from "@openpassport/zk-kit-imt";
import { LeanIMT } from "@openpassport/zk-kit-lean-imt";
import { SMT } from "@openpassport/zk-kit-smt";
countries.registerLocale(en);
function getLeaf(parsed, type) {
  if (type === "dsc") {
    const tbsArray = Object.keys(parsed.tbsBytes).map((key) => parsed.tbsBytes[key]);
    const [paddedTbsBytes, tbsBytesPaddedLength] = pad(parsed.hashAlgorithm)(
      tbsArray,
      max_dsc_bytes
    );
    const dsc_hash = packBytesAndPoseidon(Array.from(paddedTbsBytes));
    return poseidon22([dsc_hash, tbsArray.length]).toString();
  } else {
    const tbsBytesArray = Array.from(parsed.tbsBytes);
    const paddedTbsBytesArray = tbsBytesArray.concat(
      new Array(max_csca_bytes - tbsBytesArray.length).fill(0)
    );
    const csca_hash = packBytesAndPoseidon(paddedTbsBytesArray);
    return poseidon22([csca_hash, tbsBytesArray.length]).toString();
  }
}
function getLeafDscTree(dsc_parsed, csca_parsed) {
  const dscLeaf = getLeaf(dsc_parsed, "dsc");
  const cscaLeaf = getLeaf(csca_parsed, "csca");
  return poseidon22([dscLeaf, cscaLeaf]).toString();
}

// src/utils/shaPad.ts
function assert(cond, errorMessage) {
  if (!cond) {
    throw new Error(errorMessage);
  }
}
function int64toBytes(num) {
  const arr = new ArrayBuffer(8);
  const view = new DataView(arr);
  view.setInt32(4, num, false);
  return new Uint8Array(arr);
}
function int128toBytes(x) {
  const buffer = new ArrayBuffer(16);
  const view = new DataView(buffer);
  view.setBigUint64(0, BigInt(0), false);
  view.setBigUint64(8, BigInt(x), false);
  return new Uint8Array(buffer);
}
function int8toBytes(num) {
  const arr = new ArrayBuffer(1);
  const view = new DataView(arr);
  view.setUint8(0, num);
  return new Uint8Array(arr);
}
function mergeUInt8Arrays(a1, a2) {
  const mergedArray = new Uint8Array(a1.length + a2.length);
  mergedArray.set(a1);
  mergedArray.set(a2, a1.length);
  return mergedArray;
}
function sha384_512Pad(prehash_prepad_m_array, maxShaBytes) {
  let prehash_prepad_m = new Uint8Array(prehash_prepad_m_array);
  const length_bits = prehash_prepad_m.length * 8;
  const length_in_bytes = int128toBytes(length_bits);
  prehash_prepad_m = mergeUInt8Arrays(prehash_prepad_m, int8toBytes(2 ** 7));
  while ((prehash_prepad_m.length * 8 + length_in_bytes.length * 8) % 1024 !== 0) {
    prehash_prepad_m = mergeUInt8Arrays(prehash_prepad_m, int8toBytes(0));
  }
  prehash_prepad_m = mergeUInt8Arrays(prehash_prepad_m, length_in_bytes);
  assert(prehash_prepad_m.length * 8 % 1024 === 0, "Padding did not complete properly!");
  const messageLen = prehash_prepad_m.length;
  while (prehash_prepad_m.length < maxShaBytes) {
    prehash_prepad_m = mergeUInt8Arrays(prehash_prepad_m, int128toBytes(0));
  }
  assert(
    prehash_prepad_m.length === maxShaBytes,
    `Padding to max length did not complete properly! Your padded message is ${prehash_prepad_m.length} long but max is ${maxShaBytes}!`
  );
  return [Array.from(prehash_prepad_m), messageLen];
}
function shaPad(prehash_prepad_m_array, maxShaBytes) {
  let prehash_prepad_m = new Uint8Array(prehash_prepad_m_array);
  const length_bits = prehash_prepad_m.length * 8;
  const length_in_bytes = int64toBytes(length_bits);
  prehash_prepad_m = mergeUInt8Arrays(prehash_prepad_m, int8toBytes(2 ** 7));
  while ((prehash_prepad_m.length * 8 + length_in_bytes.length * 8) % 512 !== 0) {
    prehash_prepad_m = mergeUInt8Arrays(prehash_prepad_m, int8toBytes(0));
  }
  prehash_prepad_m = mergeUInt8Arrays(prehash_prepad_m, length_in_bytes);
  assert(prehash_prepad_m.length * 8 % 512 === 0, "Padding did not complete properly!");
  const messageLen = prehash_prepad_m.length;
  while (prehash_prepad_m.length < maxShaBytes) {
    prehash_prepad_m = mergeUInt8Arrays(prehash_prepad_m, int64toBytes(0));
  }
  assert(
    prehash_prepad_m.length === maxShaBytes,
    `Padding to max length did not complete properly! Your padded message is ${prehash_prepad_m.length} long but max is ${maxShaBytes}!`
  );
  return [Array.from(prehash_prepad_m), messageLen];
}

// src/utils/passports/passport.ts
function generateCommitment(secret, attestation_id, passportData) {
  const passportMetadata = passportData.passportMetadata;
  const dg1_packed_hash = packBytesAndPoseidon(formatMrz(passportData.mrz));
  const eContent_shaBytes = hash(
    passportMetadata.eContentHashFunction,
    Array.from(passportData.eContent),
    "bytes"
  );
  const eContent_packed_hash = packBytesAndPoseidon(
    eContent_shaBytes.map((byte) => byte & 255)
  );
  const dsc_hash = getLeafDscTree(passportData.dsc_parsed, passportData.csca_parsed);
  return poseidon52([
    secret,
    attestation_id,
    dg1_packed_hash,
    eContent_packed_hash,
    dsc_hash
  ]).toString();
}
function generateNullifier(passportData) {
  const signedAttr_shaBytes = hash(
    passportData.passportMetadata.signedAttrHashFunction,
    Array.from(passportData.signedAttr),
    "bytes"
  );
  const signedAttr_packed_hash = packBytesAndPoseidon(
    signedAttr_shaBytes.map((byte) => byte & 255)
  );
  return signedAttr_packed_hash;
}
function pad(hashFunction) {
  return hashFunction === "sha1" || hashFunction === "sha224" || hashFunction === "sha256" ? shaPad : sha384_512Pad;
}
export {
  generateCommitment,
  generateNullifier
};
//# sourceMappingURL=commitment.js.map