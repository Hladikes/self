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

// src/utils/circuits/discloseInputs.ts
var discloseInputs_exports = {};
__export(discloseInputs_exports, {
  generateCircuitInputsVCandDisclose: () => generateCircuitInputsVCandDisclose
});
module.exports = __toCommonJS(discloseInputs_exports);

// src/constants/constants.ts
var COMMITMENT_TREE_DEPTH = 33;
var MAX_BYTES_IN_FIELD = 31;
var MAX_FORBIDDEN_COUNTRIES_LIST_LENGTH = 40;
var OFAC_TREE_LEVELS = 64;
var max_csca_bytes = 1792;
var max_dsc_bytes = 1792;

// src/utils/date.ts
function getCurrentDateYYMMDD(dayDiff = 0) {
  const date = /* @__PURE__ */ new Date();
  date.setDate(date.getDate() + dayDiff);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const YY = `0${year % 100}`.slice(-2);
  const MM = `0${month}`.slice(-2);
  const DD = `0${day}`.slice(-2);
  const yymmdd = `${YY}${MM}${DD}`;
  return Array.from(yymmdd).map((char) => parseInt(char));
}

// src/utils/hash.ts
var import_ethers = require("ethers");
var import_js_sha1 = require("js-sha1");
var import_js_sha256 = require("js-sha256");
var import_js_sha512 = require("js-sha512");
var forge = __toESM(require("node-forge"), 1);
var import_poseidon_lite = require("poseidon-lite");

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
    const finalHash = flexiblePoseidon(hash2.map((h) => (0, import_poseidon_lite.poseidon16)(h.inputs)));
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
function hash(hashFunction, bytesArray, format = "bytes") {
  const unsignedBytesArray = bytesArray.map((byte) => byte & 255);
  let hashResult;
  switch (hashFunction) {
    case "sha1":
      hashResult = (0, import_js_sha1.sha1)(unsignedBytesArray);
      break;
    case "sha224":
      hashResult = (0, import_js_sha256.sha224)(unsignedBytesArray);
      break;
    case "sha256":
      hashResult = (0, import_js_sha256.sha256)(unsignedBytesArray);
      break;
    case "sha384":
      hashResult = (0, import_js_sha512.sha384)(unsignedBytesArray);
      break;
    case "sha512":
      hashResult = (0, import_js_sha512.sha512)(unsignedBytesArray);
      break;
    default:
      console.log("\x1B[31m%s\x1B[0m", `${hashFunction} not found in hash`);
      hashResult = (0, import_js_sha256.sha256)(unsignedBytesArray);
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

// src/utils/passports/passport.ts
var forge2 = __toESM(require("node-forge"), 1);
var import_poseidon_lite3 = require("poseidon-lite");

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
function generateSMTProof(smt, leaf) {
  const { entry, matchingEntry, siblings, root, membership } = smt.createProof(leaf);
  const leaf_depth = siblings.length;
  let closestleaf;
  if (!matchingEntry) {
    if (!entry[1]) {
      closestleaf = BigInt(0);
    } else {
      closestleaf = BigInt(entry[0]);
    }
  } else {
    closestleaf = BigInt(matchingEntry[0]);
  }
  siblings.reverse();
  while (siblings.length < OFAC_TREE_LEVELS) siblings.push(BigInt(0));
  return {
    root,
    leaf_depth,
    closestleaf,
    siblings
  };
}
function getDobLeaf(dobMrz, i) {
  if (dobMrz.length !== 6) {
    return BigInt(0);
  }
  try {
    return (0, import_poseidon_lite2.poseidon6)(dobMrz);
  } catch (err) {
    console.error("Error in getDobLeaf:", err, "Index:", i, "DOB MRZ:", dobMrz);
    return BigInt(0);
  }
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
function getLeafDscTree(dsc_parsed, csca_parsed) {
  const dscLeaf = getLeaf(dsc_parsed, "dsc");
  const cscaLeaf = getLeaf(csca_parsed, "csca");
  return (0, import_poseidon_lite2.poseidon2)([dscLeaf, cscaLeaf]).toString();
}
function generateSmallKey(input) {
  return input % (BigInt(1) << BigInt(OFAC_TREE_LEVELS));
}
function getYearLeaf(yearArr) {
  if (yearArr.length !== 2) {
    return BigInt(0);
  }
  try {
    return (0, import_poseidon_lite2.poseidon2)(yearArr);
  } catch (err) {
    return BigInt(0);
  }
}
function getNameDobLeaf(nameMrz, dobMrz, i) {
  return generateSmallKey((0, import_poseidon_lite2.poseidon2)([getDobLeaf(dobMrz), getNameLeaf(nameMrz)]));
}
function getNameLeaf(nameMrz, i) {
  const middleChunks = [];
  const chunks = [];
  try {
    if (nameMrz.length == 39) {
      chunks.push(nameMrz.slice(0, 13), nameMrz.slice(13, 26), nameMrz.slice(26, 39));
      for (const chunk of chunks) {
        if (chunk.length !== 13)
          throw new Error(`Invalid chunk length for Poseidon13: ${chunk.length}`);
        middleChunks.push((0, import_poseidon_lite2.poseidon13)(chunk));
      }
    } else if (nameMrz.length == 30) {
      chunks.push(nameMrz.slice(0, 10), nameMrz.slice(10, 20), nameMrz.slice(20, 30));
      for (const chunk of chunks) {
        if (chunk.length !== 10)
          throw new Error(`Invalid chunk length for Poseidon10: ${chunk.length}`);
        middleChunks.push((0, import_poseidon_lite2.poseidon10)(chunk));
      }
    } else {
      throw new Error(`Unsupported name MRZ length: ${nameMrz.length}`);
    }
    if (middleChunks.length !== 3)
      throw new Error(`Invalid number of middle chunks: ${middleChunks.length}`);
    return (0, import_poseidon_lite2.poseidon3)(middleChunks);
  } catch (err) {
    console.error("Error in getNameLeaf:", err, "Index:", i, "MRZ Length:", nameMrz.length);
    return BigInt(0);
  }
}
function getNameYobLeaf(nameMrz, yobMrz, i) {
  return generateSmallKey((0, import_poseidon_lite2.poseidon2)([getYearLeaf(yobMrz), getNameLeaf(nameMrz)]));
}
function getPassportNumberAndNationalityLeaf(passport, nationality, i) {
  if (passport.length !== 9) {
    console.log("parsed passport length is not 9:", i, passport);
    return;
  }
  if (nationality.length !== 3) {
    console.log("parsed nationality length is not 3:", i, nationality);
    return;
  }
  try {
    const fullHash = (0, import_poseidon_lite2.poseidon12)(passport.concat(nationality));
    return generateSmallKey(fullHash);
  } catch (err) {
    console.log("err : passport", err, i, passport);
  }
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
  return (0, import_poseidon_lite3.poseidon5)([
    secret,
    attestation_id,
    dg1_packed_hash,
    eContent_packed_hash,
    dsc_hash
  ]).toString();
}
function pad(hashFunction) {
  return hashFunction === "sha1" || hashFunction === "sha224" || hashFunction === "sha256" ? shaPad : sha384_512Pad;
}

// src/utils/circuits/formatInputs.ts
function formatCountriesList(countries2) {
  if (countries2.length > MAX_FORBIDDEN_COUNTRIES_LIST_LENGTH) {
    throw new Error(
      `Countries list must be inferior or equals to ${MAX_FORBIDDEN_COUNTRIES_LIST_LENGTH}`
    );
  }
  for (const country of countries2) {
    if (!country || country.length !== 3) {
      throw new Error(
        `Invalid country code: "${country}". Country codes must be exactly 3 characters long.`
      );
    }
  }
  const paddedCountries = countries2.concat(
    Array(MAX_FORBIDDEN_COUNTRIES_LIST_LENGTH - countries2.length).fill("")
  );
  const result = paddedCountries.flatMap((country) => {
    const chars = country.padEnd(3, "\0").split("").map((char) => char.charCodeAt(0));
    return chars;
  });
  return result;
}

// src/utils/circuits/generateInputs.ts
function findIndexInTree(tree, commitment) {
  let index = tree.indexOf(commitment);
  if (index === -1) {
    index = tree.indexOf(commitment.toString());
  }
  if (index === -1) {
    throw new Error("This commitment was not found in the tree");
  } else {
  }
  return index;
}
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
function generateCircuitInputsVCandDisclose(secret, attestation_id, passportData, scope, selector_dg1, selector_older_than, merkletree, majority, passportNo_smt, nameAndDob_smt, nameAndYob_smt, selector_ofac, forbidden_countries_list, user_identifier) {
  const { mrz, eContent, signedAttr, documentType } = passportData;
  const passportMetadata = passportData.passportMetadata;
  const isPassportType = documentType === "passport" || documentType === "mock_passport";
  const formattedMrz = formatMrz(mrz);
  const eContent_shaBytes = hash(
    passportMetadata.eContentHashFunction,
    Array.from(eContent),
    "bytes"
  );
  const eContent_packed_hash = packBytesAndPoseidon(
    eContent_shaBytes.map((byte) => byte & 255)
  );
  const dsc_tree_leaf = getLeafDscTree(passportData.dsc_parsed, passportData.csca_parsed);
  const commitment = generateCommitment(secret, attestation_id, passportData);
  const index = findIndexInTree(merkletree, BigInt(commitment));
  const { siblings, path, leaf_depth } = generateMerkleProof(
    merkletree,
    index,
    COMMITMENT_TREE_DEPTH
  );
  const formattedMajority = majority.length === 1 ? `0${majority}` : majority;
  const majority_ascii = formattedMajority.split("").map((char) => char.charCodeAt(0));
  const defaultSiblings = Array(OFAC_TREE_LEVELS).fill(BigInt(0));
  let passportNoProof = {
    root: BigInt(0),
    closestleaf: BigInt(0),
    siblings: defaultSiblings
  };
  let nameDobProof;
  let nameYobProof;
  const nameSlice = isPassportType ? formattedMrz.slice(10, 49) : formattedMrz.slice(65, 95);
  const dobSlice = isPassportType ? formattedMrz.slice(62, 68) : formattedMrz.slice(35, 41);
  const yobSlice = isPassportType ? formattedMrz.slice(62, 64) : formattedMrz.slice(35, 37);
  const nationalitySlice = isPassportType ? formattedMrz.slice(59, 62) : formattedMrz.slice(50, 53);
  const passNoSlice = isPassportType ? formattedMrz.slice(49, 58) : formattedMrz.slice(10, 19);
  const namedob_leaf = getNameDobLeaf(nameSlice, dobSlice);
  const nameyob_leaf = getNameYobLeaf(nameSlice, yobSlice);
  nameDobProof = generateSMTProof(nameAndDob_smt, namedob_leaf);
  nameYobProof = generateSMTProof(nameAndYob_smt, nameyob_leaf);
  if (isPassportType) {
    if (!passportNo_smt) {
      console.warn("Document type is passport, but passportNo_smt tree was not provided.");
    } else {
      const passportNo_leaf = getPassportNumberAndNationalityLeaf(passNoSlice, nationalitySlice);
      const proofResult = generateSMTProof(passportNo_smt, passportNo_leaf);
      passportNoProof = {
        root: BigInt(proofResult.root),
        closestleaf: BigInt(proofResult.closestleaf),
        siblings: proofResult.siblings
      };
    }
  }
  const baseInputs = {
    secret: formatInput(secret),
    attestation_id: formatInput(attestation_id),
    dg1: formatInput(formattedMrz),
    eContent_shaBytes_packed_hash: formatInput(eContent_packed_hash),
    dsc_tree_leaf: formatInput(dsc_tree_leaf),
    merkle_root: formatInput(merkletree.root),
    leaf_depth: formatInput(leaf_depth),
    path: formatInput(path),
    siblings: formatInput(siblings),
    selector_dg1: formatInput(selector_dg1),
    selector_older_than: formatInput(selector_older_than),
    scope: formatInput(scope),
    current_date: formatInput(getCurrentDateYYMMDD()),
    majority: formatInput(majority_ascii),
    user_identifier: formatInput(user_identifier),
    selector_ofac: formatInput(selector_ofac),
    forbidden_countries_list: formatInput(formatCountriesList(forbidden_countries_list))
  };
  const ofacNameInputs = {
    ofac_namedob_smt_root: formatInput(nameDobProof.root),
    ofac_namedob_smt_leaf_key: formatInput(nameDobProof.closestleaf),
    ofac_namedob_smt_siblings: formatInput(nameDobProof.siblings),
    ofac_nameyob_smt_root: formatInput(nameYobProof.root),
    ofac_nameyob_smt_leaf_key: formatInput(nameYobProof.closestleaf),
    ofac_nameyob_smt_siblings: formatInput(nameYobProof.siblings)
  };
  const finalInputs = {
    ...baseInputs,
    ...ofacNameInputs,
    ...isPassportType && {
      ofac_passportno_smt_root: formatInput(passportNoProof.root),
      ofac_passportno_smt_leaf_key: formatInput(passportNoProof.closestleaf),
      ofac_passportno_smt_siblings: formatInput(passportNoProof.siblings)
    }
  };
  return finalInputs;
}
//# sourceMappingURL=discloseInputs.cjs.map