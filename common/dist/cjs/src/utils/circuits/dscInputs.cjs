var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/circuits/dscInputs.ts
var dscInputs_exports = {};
__export(dscInputs_exports, {
  generateCircuitInputsDSC: () => generateCircuitInputsDSC
});
module.exports = __toCommonJS(dscInputs_exports);

// src/constants/constants.ts
var CSCA_TREE_DEPTH = 12;
var MAX_BYTES_IN_FIELD = 31;
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
var import_ethers = require("ethers");
var import_js_sha1 = require("js-sha1");
var import_js_sha256 = require("js-sha256");
var import_js_sha512 = require("js-sha512");
var forge = __toESM(require("node-forge"), 1);
var import_poseidon_lite = require("poseidon-lite");

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
    const finalHash = flexiblePoseidon(hash.map((h) => (0, import_poseidon_lite.poseidon16)(h.inputs)));
    return finalHash.toString();
  }
}
function flexiblePoseidon(inputs) {
  switch (inputs.length) {
    case 1:
      return (0, import_poseidon_lite.poseidon1)(inputs);
    case 2:
      return (0, import_poseidon_lite.poseidon2)(inputs);
    case 3:
      return (0, import_poseidon_lite.poseidon3)(inputs);
    case 4:
      return (0, import_poseidon_lite.poseidon4)(inputs);
    case 5:
      return (0, import_poseidon_lite.poseidon5)(inputs);
    case 6:
      return (0, import_poseidon_lite.poseidon6)(inputs);
    case 7:
      return (0, import_poseidon_lite.poseidon7)(inputs);
    case 8:
      return (0, import_poseidon_lite.poseidon8)(inputs);
    case 9:
      return (0, import_poseidon_lite.poseidon9)(inputs);
    case 10:
      return (0, import_poseidon_lite.poseidon10)(inputs);
    case 11:
      return (0, import_poseidon_lite.poseidon11)(inputs);
    case 12:
      return (0, import_poseidon_lite.poseidon12)(inputs);
    case 13:
      return (0, import_poseidon_lite.poseidon13)(inputs);
    case 14:
      return (0, import_poseidon_lite.poseidon14)(inputs);
    case 15:
      return (0, import_poseidon_lite.poseidon15)(inputs);
    case 16:
      return (0, import_poseidon_lite.poseidon16)(inputs);
    default:
      throw new Error(`Unsupported number of inputs: ${inputs.length}`);
  }
}
function packBytesAndPoseidon(unpacked) {
  const packed = packBytesArray(unpacked);
  return customHasher(packed.map(String)).toString();
}

// src/utils/passports/passport.ts
var forge2 = __toESM(require("node-forge"), 1);
var import_poseidon_lite3 = require("poseidon-lite");

// src/utils/certificate_parsing/parseCertificateSimple.ts
var asn1js = __toESM(require("asn1js"), 1);
var import_pkijs = require("pkijs");
function getCertificateFromPem(pemContent) {
  const pemFormatted = pemContent.replace(/(-----(BEGIN|END) CERTIFICATE-----|\n|\r)/g, "");
  const binary = Buffer.from(pemFormatted, "base64");
  const arrayBuffer = new ArrayBuffer(binary.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < binary.length; i++) {
    view[i] = binary[i];
  }
  const asn12 = asn1js.fromBER(arrayBuffer);
  if (asn12.offset === -1) {
    throw new Error(`ASN.1 parsing error: ${asn12.result.error}`);
  }
  return new import_pkijs.Certificate({ schema: asn12.result });
}

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
var import_i18n_iso_countries = __toESM(require("i18n-iso-countries"), 1);
var import_en = __toESM(require("i18n-iso-countries/langs/en.json"), 1);
var import_poseidon_lite2 = require("poseidon-lite");
var import_zk_kit_imt = require("@openpassport/zk-kit-imt");
var import_zk_kit_lean_imt = require("@openpassport/zk-kit-lean-imt");
var import_zk_kit_smt = require("@openpassport/zk-kit-smt");
import_i18n_iso_countries.default.registerLocale(import_en.default);
function getCscaTreeInclusionProof(leaf, _serialized_csca_tree) {
  const tree = new import_zk_kit_imt.IMT(import_poseidon_lite2.poseidon2, CSCA_TREE_DEPTH, 0, 2);
  tree.setNodes(_serialized_csca_tree);
  const index = tree.indexOf(leaf);
  if (index === -1) {
    throw new Error("Your public key was not found in the registry");
  }
  const proof = tree.createProof(index);
  return [
    tree.root,
    proof.pathIndices.map((index2) => index2.toString()),
    proof.siblings.flat().map((sibling) => sibling.toString())
  ];
}
function getLeaf(parsed, type) {
  if (type === "dsc") {
    const tbsArray = Object.keys(parsed.tbsBytes).map((key) => parsed.tbsBytes[key]);
    const [paddedTbsBytes, tbsBytesPaddedLength] = pad(parsed.hashAlgorithm)(
      tbsArray,
      max_dsc_bytes
    );
    const dsc_hash = packBytesAndPoseidon(Array.from(paddedTbsBytes));
    return (0, import_poseidon_lite2.poseidon2)([dsc_hash, tbsArray.length]).toString();
  } else {
    const tbsBytesArray = Array.from(parsed.tbsBytes);
    const paddedTbsBytesArray = tbsBytesArray.concat(
      new Array(max_csca_bytes - tbsBytesArray.length).fill(0)
    );
    const csca_hash = packBytesAndPoseidon(paddedTbsBytesArray);
    return (0, import_poseidon_lite2.poseidon2)([csca_hash, tbsBytesArray.length]).toString();
  }
}
function getLeafCscaTree(csca_parsed) {
  return getLeaf(csca_parsed, "csca");
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
function extractSignatureFromDSC(dscCertificate) {
  const cert = getCertificateFromPem(dscCertificate);
  const dscSignature = cert.signatureValue.valueBlock.valueHexView;
  return Array.from(dscSignature);
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
function formatSignatureDSCCircuit(cscaSignatureAlgorithm, cscaHashFunction, cscaCertificateData, signature) {
  const cscaSignatureAlgorithmFullName = getSignatureAlgorithmFullName(
    cscaCertificateData,
    cscaSignatureAlgorithm,
    cscaHashFunction
  );
  const { n, k } = getNAndK(cscaSignatureAlgorithmFullName);
  if (cscaSignatureAlgorithm === "ecdsa") {
    const { r, s } = extractRSFromSignature(signature);
    const signature_r = splitToWords(BigInt(hexToDecimal(r)), n, k);
    const signature_s = splitToWords(BigInt(hexToDecimal(s)), n, k);
    return [...signature_r, ...signature_s];
  } else {
    return formatInput(splitToWords(BigInt(bytesToBigDecimal(signature)), n, k));
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
function padWithZeroes(bytes, length) {
  return bytes.concat(new Array(length - bytes.length).fill(0));
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
function generateCircuitInputsDSC(passportData, serializedCscaTree) {
  const passportMetadata = passportData.passportMetadata;
  const cscaParsed = passportData.csca_parsed;
  const dscParsed = passportData.dsc_parsed;
  const raw_dsc = passportData.dsc;
  const cscaTbsBytesPadded = padWithZeroes(cscaParsed.tbsBytes, max_csca_bytes);
  const dscTbsBytes = dscParsed.tbsBytes;
  const [dscTbsBytesPadded, dscTbsBytesLen] = pad(passportMetadata.cscaHashFunction)(
    dscTbsBytes,
    max_dsc_bytes
  );
  const leaf = getLeafCscaTree(cscaParsed);
  const [root, path, siblings] = getCscaTreeInclusionProof(leaf, serializedCscaTree);
  const csca_pubKey_formatted = getCertificatePubKey(
    cscaParsed,
    passportMetadata.cscaSignatureAlgorithm,
    passportMetadata.cscaHashFunction
  );
  const signatureRaw = extractSignatureFromDSC(raw_dsc);
  const signature = formatSignatureDSCCircuit(
    passportMetadata.cscaSignatureAlgorithm,
    passportMetadata.cscaHashFunction,
    cscaParsed,
    signatureRaw
  );
  const [startIndex, keyLength] = findStartPubKeyIndex(
    cscaParsed,
    cscaTbsBytesPadded,
    passportMetadata.cscaSignatureAlgorithm
  );
  return {
    raw_csca: cscaTbsBytesPadded.map((x) => x.toString()),
    raw_csca_actual_length: BigInt(cscaParsed.tbsBytes.length).toString(),
    csca_pubKey_offset: startIndex.toString(),
    csca_pubKey_actual_size: BigInt(keyLength).toString(),
    raw_dsc: Array.from(dscTbsBytesPadded).map((x) => x.toString()),
    raw_dsc_padded_length: BigInt(dscTbsBytesLen).toString(),
    // with the sha padding actually
    csca_pubKey: csca_pubKey_formatted,
    signature,
    merkle_root: root,
    path,
    siblings
  };
}
//# sourceMappingURL=dscInputs.cjs.map