// src/utils/passports/passport.ts
import * as forge from "node-forge";
import { poseidon5 } from "poseidon-lite";

// src/constants/constants.ts
var k_dsc = 35;
var k_dsc_3072 = 35;
var k_dsc_4096 = 35;
var n_dsc = 120;
var n_dsc_3072 = 120;
var n_dsc_4096 = 120;
var n_dsc_ecdsa = 64;

// src/utils/bytes.ts
function bytesToBigDecimal(arr) {
  let result = BigInt(0);
  for (let i = 0; i < arr.length; i++) {
    result = result * BigInt(256) + BigInt(arr[i] & 255);
  }
  return result.toString();
}
function hexToDecimal(hex) {
  return BigInt(`0x${hex}`).toString();
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

// src/utils/certificate_parsing/parseCertificateSimple.ts
import * as asn1js from "asn1js";
import { Certificate, RSAPublicKey, RSASSAPSSParams } from "pkijs";
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
  return new Certificate({ schema: asn12.result });
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

// src/utils/passports/passport.ts
function extractRSFromSignature(signatureBytes) {
  const derSignature = Buffer.from(signatureBytes).toString("binary");
  const asn12 = forge.asn1.fromDer(derSignature);
  const signatureAsn1 = asn12.value;
  if (signatureAsn1.length !== 2) {
    throw new Error("Invalid signature format");
  }
  if (!Array.isArray(asn12.value) || asn12.value.length !== 2) {
    throw new Error("Invalid signature format");
  }
  const r = forge.util.createBuffer(asn12.value[0].value).toHex();
  const s = forge.util.createBuffer(asn12.value[1].value).toHex();
  return { r, s };
}
function extractSignatureFromDSC(dscCertificate) {
  const cert = getCertificateFromPem(dscCertificate);
  const dscSignature = cert.signatureValue.valueBlock.valueHexView;
  return Array.from(dscSignature);
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
export {
  extractRSFromSignature,
  extractSignatureFromDSC,
  formatSignatureDSCCircuit,
  getNAndK,
  getPassportSignatureInfos,
  getSignatureAlgorithmFullName
};
//# sourceMappingURL=signature.js.map