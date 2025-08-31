// src/constants/constants.ts
var DSC_TREE_DEPTH = 21;
var MAX_BYTES_IN_FIELD = 31;
var MAX_PADDED_ECONTENT_LEN = {
  sha1: 384,
  sha224: 512,
  sha256: 512,
  sha384: 768,
  sha512: 896
};
var MAX_PADDED_SIGNED_ATTR_LEN = {
  sha1: 128,
  sha224: 128,
  sha256: 128,
  sha384: 256,
  sha512: 256
};
var k_dsc = 35;
var k_dsc_3072 = 35;
var k_dsc_4096 = 35;
var max_csca_bytes = 1792;
var max_dsc_bytes = 1792;
var n_dsc = 120;
var n_dsc_3072 = 120;
var n_dsc_4096 = 120;
var n_dsc_ecdsa = 64;

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

// src/utils/bytes.ts
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
function hexToDecimal(hex) {
  return BigInt(`0x${hex}`).toString();
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

// src/utils/hash.ts
function customHasher(pubKeyFormatted) {
  if (pubKeyFormatted.length < 16) {
    return flexiblePoseidon(pubKeyFormatted.map(BigInt)).toString();
  } else {
    const rounds = Math.ceil(pubKeyFormatted.length / 16);
    if (rounds > 16) {
      throw new Error("Number of rounds is greater than 16");
    }
    const hash = new Array(rounds);
    for (let i = 0; i < rounds; i++) {
      hash[i] = { inputs: new Array(16).fill(BigInt(0)) };
    }
    for (let i = 0; i < rounds; i++) {
      for (let j = 0; j < 16; j++) {
        if (i * 16 + j < pubKeyFormatted.length) {
          hash[i].inputs[j] = BigInt(pubKeyFormatted[i * 16 + j]);
        }
      }
    }
    const finalHash = flexiblePoseidon(hash.map((h) => poseidon16(h.inputs)));
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

// src/utils/passports/passport.ts
import * as forge2 from "node-forge";
import { poseidon5 as poseidon52 } from "poseidon-lite";

// src/utils/csca.ts
function findStartIndex(modulus, messagePaddedNumber) {
  const modulusNumArray = [];
  for (let i = 0; i < modulus.length; i += 2) {
    const hexPair = modulus.slice(i, i + 2);
    const number = parseInt(hexPair, 16);
    modulusNumArray.push(number);
  }
  for (let i = 0; i < messagePaddedNumber.length - modulusNumArray.length + 1; i++) {
    let matched = true;
    for (let j = 0; j < modulusNumArray.length; j++) {
      if (modulusNumArray[j] !== messagePaddedNumber[i + j]) {
        matched = false;
        break;
      }
    }
    if (matched) {
      return [i, modulusNumArray.length];
    }
  }
  throw new Error("DSC Pubkey not found in certificate");
}
function findStartIndexEC(point, messagePadded) {
  const pointNumArray = [];
  for (let i = 0; i < point.length; i += 2) {
    pointNumArray.push(parseInt(point.slice(i, i + 2), 16));
  }
  let startIndex = -1;
  for (let i = 0; i < messagePadded.length - pointNumArray.length + 1; i++) {
    const isMatch = pointNumArray.every((byte, j) => messagePadded[i + j] === byte);
    if (isMatch) {
      startIndex = i;
      break;
    }
  }
  if (startIndex === -1) {
    throw new Error("DSC Pubkey not found in CSCA certificate");
  }
  return [startIndex, pointNumArray.length];
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

// src/utils/trees.ts
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { poseidon2 as poseidon22, poseidon3 as poseidon32, poseidon6 as poseidon62, poseidon10 as poseidon102, poseidon12 as poseidon122, poseidon13 as poseidon132 } from "poseidon-lite";
import { IMT } from "@openpassport/zk-kit-imt";
import { LeanIMT } from "@openpassport/zk-kit-lean-imt";
import { SMT } from "@openpassport/zk-kit-smt";
countries.registerLocale(en);
function generateMerkleProof(imt, _index, maxleaf_depth) {
  const { siblings, index } = imt.generateProof(_index);
  const leaf_depth = siblings.length;
  const path = [];
  for (let i = 0; i < maxleaf_depth; i += 1) {
    path.push(index >> i & 1);
    if (siblings[i] === void 0) {
      siblings[i] = BigInt(0);
    }
  }
  return { siblings, path, leaf_depth };
}
function getDscTreeInclusionProof(leaf, serialized_dsc_tree) {
  const hashFunction = (a, b) => poseidon22([a, b]);
  const tree = LeanIMT.import(hashFunction, serialized_dsc_tree);
  const index = tree.indexOf(BigInt(leaf));
  if (index === -1) {
    throw new Error("Your public key was not found in the registry");
  }
  const { siblings, path, leaf_depth } = generateMerkleProof(tree, index, DSC_TREE_DEPTH);
  return [tree.root, path, siblings, leaf_depth];
}
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
function getLeafCscaTree(csca_parsed) {
  return getLeaf(csca_parsed, "csca");
}
function getLeafDscTree(dsc_parsed, csca_parsed) {
  const dscLeaf = getLeaf(dsc_parsed, "dsc");
  const cscaLeaf = getLeaf(csca_parsed, "csca");
  return poseidon22([dscLeaf, cscaLeaf]).toString();
}

// src/utils/passports/passport.ts
function extractRSFromSignature(signatureBytes) {
  const derSignature = Buffer.from(signatureBytes).toString("binary");
  const asn12 = forge2.asn1.fromDer(derSignature);
  const signatureAsn1 = asn12.value;
  if (signatureAsn1.length !== 2) {
    throw new Error("Invalid signature format");
  }
  if (!Array.isArray(asn12.value) || asn12.value.length !== 2) {
    throw new Error("Invalid signature format");
  }
  const r = forge2.util.createBuffer(asn12.value[0].value).toHex();
  const s = forge2.util.createBuffer(asn12.value[1].value).toHex();
  return { r, s };
}
function findStartPubKeyIndex(certificateData, rawCert, signatureAlgorithm) {
  const { publicKeyDetails } = certificateData;
  if (signatureAlgorithm === "ecdsa") {
    const { x, y } = publicKeyDetails;
    const [x_index, x_totalLength] = findStartIndexEC(x, rawCert);
    const [y_index, y_totalLength] = findStartIndexEC(y, rawCert);
    return [x_index, x_totalLength + y_totalLength];
  } else {
    const { modulus } = publicKeyDetails;
    return findStartIndex(modulus, rawCert);
  }
}
function getPassportSignature(passportData, n, k) {
  const { signatureAlgorithm } = passportData.dsc_parsed;
  if (signatureAlgorithm === "ecdsa") {
    const { r, s } = extractRSFromSignature(passportData.encryptedDigest);
    const signature_r = splitToWords(BigInt(hexToDecimal(r)), n, k);
    const signature_s = splitToWords(BigInt(hexToDecimal(s)), n, k);
    return [...signature_r, ...signature_s];
  } else {
    return splitToWords(BigInt(bytesToBigDecimal(passportData.encryptedDigest)), n, k);
  }
}
function getCertificatePubKey(certificateData, signatureAlgorithm, hashFunction) {
  const signatureAlgorithmFullName = getSignatureAlgorithmFullName(
    certificateData,
    signatureAlgorithm,
    hashFunction
  );
  const { n, k } = getNAndK(signatureAlgorithmFullName);
  const { publicKeyDetails } = certificateData;
  if (signatureAlgorithm === "ecdsa") {
    const { x, y } = publicKeyDetails;
    const x_dsc = splitToWords(BigInt(hexToDecimal(x)), n, k);
    const y_dsc = splitToWords(BigInt(hexToDecimal(y)), n, k);
    return [...x_dsc, ...y_dsc];
  } else {
    const { modulus } = publicKeyDetails;
    return splitToWords(BigInt(hexToDecimal(modulus)), n, k);
  }
}
function getNAndK(sigAlg) {
  if (sigAlg === "rsa_sha256_65537_3072") {
    return { n: n_dsc_3072, k: k_dsc };
  }
  if (sigAlg.startsWith("ecdsa_")) {
    if (sigAlg.endsWith("224")) {
      return { n: 32, k: 7 };
    } else if (sigAlg.endsWith("256")) {
      return { n: n_dsc_ecdsa, k: 4 };
    } else if (sigAlg.endsWith("384")) {
      return { n: n_dsc_ecdsa, k: 6 };
    } else if (sigAlg.endsWith("512")) {
      return { n: n_dsc_ecdsa, k: 8 };
    } else if (sigAlg.endsWith("521")) {
      return { n: 66, k: 8 };
    } else {
      throw new Error("invalid key size");
    }
  }
  if (sigAlg.startsWith("rsapss_")) {
    const keyLength = parseInt(sigAlg.split("_")[3]);
    if (keyLength === 3072) {
      return { n: n_dsc_3072, k: k_dsc_3072 };
    }
    if (keyLength === 4096) {
      return { n: n_dsc_4096, k: k_dsc_4096 };
    }
    return { n: n_dsc, k: k_dsc };
  }
  if (sigAlg === "rsa_sha256_65537_4096" || sigAlg === "rsa_sha512_65537_4096") {
    return { n: n_dsc_4096, k: k_dsc_4096 };
  }
  return { n: n_dsc, k: k_dsc };
}
function getPassportSignatureInfos(passportData) {
  const passportMetadata = passportData.passportMetadata;
  const signatureAlgorithmFullName = getSignatureAlgorithmFullName(
    passportData.dsc_parsed,
    passportMetadata.signatureAlgorithm,
    passportMetadata.signedAttrHashFunction
  );
  const { n, k } = getNAndK(signatureAlgorithmFullName);
  return {
    pubKey: getCertificatePubKey(
      passportData.dsc_parsed,
      passportMetadata.signatureAlgorithm,
      passportMetadata.signedAttrHashFunction
    ),
    signature: getPassportSignature(passportData, n, k),
    signatureAlgorithmFullName
  };
}
function getSignatureAlgorithmFullName(certificateData, signatureAlgorithm, hashAlgorithm) {
  const { publicKeyDetails } = certificateData;
  if (signatureAlgorithm === "ecdsa") {
    return `${signatureAlgorithm}_${hashAlgorithm}_${publicKeyDetails.curve}_${publicKeyDetails.bits}`;
  } else {
    const { exponent } = publicKeyDetails;
    return `${signatureAlgorithm}_${hashAlgorithm}_${exponent}_${publicKeyDetails.bits}`;
  }
}
function pad(hashFunction) {
  return hashFunction === "sha1" || hashFunction === "sha224" || hashFunction === "sha256" ? shaPad : sha384_512Pad;
}

// src/utils/circuits/generateInputs.ts
function formatInput(input) {
  if (Array.isArray(input)) {
    return input.map((item) => BigInt(item).toString());
  } else if (input instanceof Uint8Array) {
    return Array.from(input).map((num) => BigInt(num).toString());
  } else if (typeof input === "string" && input.includes(",")) {
    const numbers = input.split(",").map((s) => s.trim()).filter((s) => s !== "" && !isNaN(Number(s))).map(Number);
    try {
      return numbers.map((num) => BigInt(num).toString());
    } catch (e) {
      throw e;
    }
  } else {
    return [BigInt(input).toString()];
  }
}
function generateCircuitInputsRegister(secret, passportData, serializedDscTree) {
  const { mrz, eContent, signedAttr } = passportData;
  const passportMetadata = passportData.passportMetadata;
  const dscParsed = passportData.dsc_parsed;
  const [dscTbsBytesPadded] = pad(dscParsed.hashAlgorithm)(dscParsed.tbsBytes, max_dsc_bytes);
  const { pubKey, signature, signatureAlgorithmFullName } = getPassportSignatureInfos(passportData);
  const mrz_formatted = formatMrz(mrz);
  if (eContent.length > MAX_PADDED_ECONTENT_LEN[signatureAlgorithmFullName]) {
    console.error(
      `eContent too long (${eContent.length} bytes). Max length is ${MAX_PADDED_ECONTENT_LEN[signatureAlgorithmFullName]} bytes.`
    );
    throw new Error(
      `This length of datagroups (${eContent.length} bytes) is currently unsupported. Please contact us so we add support!`
    );
  }
  const [eContentPadded, eContentLen] = pad(passportMetadata.eContentHashFunction)(
    eContent,
    MAX_PADDED_ECONTENT_LEN[passportMetadata.dg1HashFunction]
  );
  const [signedAttrPadded, signedAttrPaddedLen] = pad(passportMetadata.signedAttrHashFunction)(
    signedAttr,
    MAX_PADDED_SIGNED_ATTR_LEN[passportMetadata.eContentHashFunction]
  );
  const dsc_leaf = getLeafDscTree(dscParsed, passportData.csca_parsed);
  const [root, path, siblings, leaf_depth] = getDscTreeInclusionProof(dsc_leaf, serializedDscTree);
  const csca_tree_leaf = getLeafCscaTree(passportData.csca_parsed);
  const [startIndex, keyLength] = findStartPubKeyIndex(
    dscParsed,
    dscTbsBytesPadded,
    dscParsed.signatureAlgorithm
  );
  const inputs = {
    raw_dsc: dscTbsBytesPadded.map((x) => x.toString()),
    raw_dsc_actual_length: [BigInt(dscParsed.tbsBytes.length).toString()],
    dsc_pubKey_offset: startIndex,
    dsc_pubKey_actual_size: [BigInt(keyLength).toString()],
    dg1: mrz_formatted,
    dg1_hash_offset: passportMetadata.dg1HashOffset,
    eContent: eContentPadded,
    eContent_padded_length: eContentLen,
    signed_attr: signedAttrPadded,
    signed_attr_padded_length: signedAttrPaddedLen,
    signed_attr_econtent_hash_offset: passportMetadata.eContentHashOffset,
    pubKey_dsc: pubKey,
    signature_passport: signature,
    merkle_root: [BigInt(root).toString()],
    leaf_depth,
    path,
    siblings,
    csca_tree_leaf,
    secret
  };
  return Object.entries(inputs).map(([key, value]) => ({
    [key]: formatInput(value)
  })).reduce((acc, curr) => ({ ...acc, ...curr }), {});
}
export {
  generateCircuitInputsRegister
};
//# sourceMappingURL=registerInputs.js.map