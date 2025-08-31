var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/errors/SdkError.ts
var SdkError = class extends Error {
  constructor(message, code, category, retryable = false, options) {
    super(message);
    this.name = "SdkError";
    this.code = code;
    this.category = category;
    this.retryable = retryable;
    if (options?.cause) {
      this.cause = options.cause;
    }
  }
};
function notImplemented(name) {
  return new SdkError(`${name} adapter not provided`, "SELF_ERR_ADAPTER_MISSING", "config", false);
}
function sdkError(message, code, category, retryable = false) {
  return new SdkError(message, code, category, retryable);
}

// src/errors/MrzParseError.ts
var MrzParseError = class extends SdkError {
  constructor(message, options) {
    super(message, "SELF_ERR_MRZ_PARSE", "validation", false, options);
    this.name = "MrzParseError";
  }
};

// src/errors/NfcParseError.ts
var NfcParseError = class extends SdkError {
  constructor(message, options) {
    super(message, "SELF_ERR_NFC_PARSE", "validation", false, options);
    this.name = "NfcParseError";
  }
};

// src/errors/index.ts
var SCANNER_ERROR_CODES = {
  UNAVAILABLE: "SELF_ERR_SCANNER_UNAVAILABLE",
  NFC_NOT_SUPPORTED: "SELF_ERR_NFC_NOT_SUPPORTED",
  INVALID_MODE: "SELF_ERR_SCANNER_MODE"
};

// src/context.tsx
import { createContext, useContext, useMemo } from "react";

// src/config/defaults.ts
var defaultConfig = {
  endpoints: { api: "", teeWs: "", artifactsCdn: "" },
  timeouts: { httpMs: 3e4, wsMs: 6e4, scanMs: 6e4, proofMs: 12e4 },
  features: {},
  tlsPinning: { enabled: false }
};

// src/config/merge.ts
function mergeConfig(base, override) {
  return {
    ...base,
    ...override,
    endpoints: { ...base.endpoints, ...override.endpoints ?? {} },
    timeouts: { ...base.timeouts, ...override.timeouts ?? {} },
    features: { ...base.features, ...override.features ?? {} },
    tlsPinning: { ...base.tlsPinning, ...override.tlsPinning ?? {} }
  };
}

// src/processing/mrz.ts
function calculateCheckDigit(input) {
  const weights = [7, 3, 1];
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    let value;
    if (char >= "0" && char <= "9") {
      value = parseInt(char, 10);
    } else if (char >= "A" && char <= "Z") {
      value = char.charCodeAt(0) - "A".charCodeAt(0) + 10;
    } else if (char === "<") {
      value = 0;
    } else {
      throw new MrzParseError(`Invalid character in MRZ: ${char}`);
    }
    sum += value * weights[i % 3];
  }
  return sum % 10;
}
function verifyCheckDigit(field, expectedCheckDigit) {
  if (!/^\d$/.test(expectedCheckDigit)) {
    return false;
  }
  const expected = parseInt(expectedCheckDigit, 10);
  try {
    const calculated = calculateCheckDigit(field);
    return calculated === expected;
  } catch {
    return false;
  }
}
function parseNames(nameField) {
  const parts = nameField.split("<<");
  if (parts.length === 1) {
    return {
      surname: nameField.replace(/</g, " ").trim(),
      givenNames: ""
    };
  }
  let givenNamesStartIndex = parts.length;
  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i];
    if (part.includes("<") && !part.endsWith("<".repeat(part.length))) {
      givenNamesStartIndex = i;
      break;
    }
  }
  if (givenNamesStartIndex >= parts.length) {
    const firstDoubleSeparator = nameField.indexOf("<<");
    if (firstDoubleSeparator === -1) {
      return {
        surname: nameField.replace(/</g, " ").trim(),
        givenNames: ""
      };
    }
    const surnameField = nameField.slice(0, firstDoubleSeparator);
    const givenNamesField = nameField.slice(firstDoubleSeparator + 2);
    return {
      surname: surnameField.replace(/</g, " ").trim(),
      givenNames: givenNamesField.replace(/</g, " ").trim()
    };
  }
  const surnameParts = parts.slice(0, givenNamesStartIndex);
  const surname = surnameParts.join("  ").replace(/</g, " ").trim();
  const givenNamesParts = parts.slice(givenNamesStartIndex);
  const givenNames = givenNamesParts.join(" ").replace(/</g, " ").trim();
  return { surname, givenNames };
}
function validateTD3Format(lines) {
  if (lines.length !== 2) {
    return false;
  }
  return lines[0].length === 44 && lines[1].length === 44;
}
function extractTD3Info(lines) {
  const line1 = lines[0];
  const line2 = lines[1];
  const documentType = line1.slice(0, 1);
  const issuingCountry = line1.slice(2, 5).replace(/</g, "").replace(/[^A-Z]/g, "");
  const nameField = line1.slice(5, 44);
  const { surname, givenNames } = parseNames(nameField);
  const passportNumber = line2.slice(0, 9).replace(/</g, "");
  const rawNat = line2.slice(10, 14);
  let nationality = "";
  for (let i = 0; i <= rawNat.length - 3; i++) {
    const candidate = rawNat.slice(i, i + 3);
    if (/^[A-Z]{3}$/.test(candidate)) {
      nationality = candidate;
      break;
    }
  }
  if (!nationality) {
    nationality = rawNat.slice(0, 3).replace(/[^A-Z]/g, "");
  }
  const dateOfBirth = line2.slice(13, 19);
  const sex = line2.slice(20, 21).replace(/</g, "");
  const dateOfExpiry = line2.slice(21, 27);
  return {
    documentType,
    issuingCountry,
    surname,
    givenNames,
    passportNumber,
    nationality,
    dateOfBirth,
    sex,
    dateOfExpiry
  };
}
function validateTD3CheckDigits(lines) {
  const line2 = lines[1];
  const passportNumber = line2.slice(0, 9);
  const passportCheckDigit = line2.slice(9, 10);
  const dateOfBirth = line2.slice(13, 19);
  const dobCheckDigit = line2.slice(19, 20);
  const dateOfExpiry = line2.slice(21, 27);
  const expiryCheckDigit = line2.slice(27, 28);
  const compositeField = line2.slice(0, 10) + line2.slice(13, 20) + line2.slice(21, 28) + line2.slice(28, 43);
  const compositeCheckDigit = line2.slice(43, 44);
  return {
    passportNumberChecksum: verifyCheckDigit(passportNumber, passportCheckDigit),
    dateOfBirthChecksum: verifyCheckDigit(dateOfBirth, dobCheckDigit),
    dateOfExpiryChecksum: verifyCheckDigit(dateOfExpiry, expiryCheckDigit),
    compositeChecksum: verifyCheckDigit(compositeField, compositeCheckDigit)
  };
}
function extractMRZInfo(mrzString) {
  if (!mrzString || typeof mrzString !== "string") {
    throw new MrzParseError("MRZ string is required and must be a string");
  }
  const lines = mrzString.trim().split("\n").map((line) => line.trim());
  const isValidTD3 = validateTD3Format(lines);
  if (!isValidTD3) {
    throw new MrzParseError(
      `Invalid MRZ format: Expected TD3 format (2 lines \xD7 44 characters), got ${lines.length} lines with lengths [${lines.map((l) => l.length).join(", ")}]`
    );
  }
  const info = extractTD3Info(lines);
  const checksums = validateTD3CheckDigits(lines);
  const validation = {
    format: isValidTD3,
    ...checksums,
    overall: isValidTD3 && Object.values(checksums).every(Boolean)
  };
  return {
    ...info,
    validation
  };
}
function formatDateToYYMMDD(inputDate) {
  if (!inputDate || typeof inputDate !== "string") {
    throw new MrzParseError("Date string is required");
  }
  const isoMatch = inputDate.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    return year.slice(2) + month + day;
  }
  const dateMatch = inputDate.match(/^(\d{2,4})[-/]?(\d{2})[-/]?(\d{2})/);
  if (dateMatch) {
    let [, year] = dateMatch;
    const [, , month, day] = dateMatch;
    if (year.length === 2) {
      const yearNum = parseInt(year, 10);
      year = yearNum <= 30 ? `20${year}` : `19${year}`;
    }
    return year.slice(2) + month + day;
  }
  throw new MrzParseError(`Invalid date format: ${inputDate}. Expected ISO format (YYYY-MM-DD) or similar.`);
}

// src/client.ts
var optionalDefaults = {
  storage: {
    get: async () => null,
    set: async () => {
    },
    remove: async () => {
    }
  },
  clock: {
    now: () => Date.now(),
    sleep: async (ms) => {
      await new Promise((r) => setTimeout(r, ms));
    }
  },
  logger: {
    log: () => {
    }
  }
};
function createSelfClient({ config, adapters }) {
  const cfg = mergeConfig(defaultConfig, config);
  const required = ["scanner", "network", "crypto"];
  for (const name of required) {
    if (!(name in adapters) || !adapters[name]) throw notImplemented(name);
  }
  const _adapters = { ...optionalDefaults, ...adapters };
  const listeners = /* @__PURE__ */ new Map();
  function on(event, cb) {
    const set = listeners.get(event) ?? /* @__PURE__ */ new Set();
    set.add(cb);
    listeners.set(event, set);
    return () => set.delete(cb);
  }
  function emit(event, payload) {
    const set = listeners.get(event);
    if (!set) return;
    for (const cb of Array.from(set)) {
      try {
        cb(payload);
      } catch (err) {
        _adapters.logger.log("error", `event-listener error for event '${event}'`, { event, error: err });
      }
    }
  }
  async function scanDocument(opts) {
    return _adapters.scanner.scan(opts);
  }
  async function validateDocument(_input) {
    return { ok: false, reason: "SELF_ERR_VALIDATION_STUB" };
  }
  async function checkRegistration(_input) {
    return { registered: false, reason: "SELF_REG_STATUS_STUB" };
  }
  async function registerDocument(_input) {
    return { registered: false, reason: "SELF_REG_STATUS_STUB" };
  }
  async function generateProof(_req, opts = {}) {
    if (!adapters.network) throw notImplemented("network");
    if (!adapters.crypto) throw notImplemented("crypto");
    const timeoutMs = opts.timeoutMs ?? cfg.timeouts?.proofMs ?? defaultConfig.timeouts.proofMs;
    void _adapters.clock.sleep(timeoutMs, opts.signal).then(() => emit("error", new Error("timeout")));
    return {
      id: "stub",
      status: "pending",
      result: async () => ({ ok: false, reason: "SELF_ERR_PROOF_STUB" }),
      cancel: () => {
      }
    };
  }
  return {
    scanDocument,
    validateDocument,
    checkRegistration,
    registerDocument,
    generateProof,
    extractMRZInfo,
    on,
    emit
  };
}

// src/context.tsx
import { jsx } from "react/jsx-runtime";
var SelfClientContext = createContext(null);
function SelfClientProvider({ config, adapters = {}, children }) {
  const client = useMemo(() => createSelfClient({ config, adapters }), [config, adapters]);
  return /* @__PURE__ */ jsx(SelfClientContext.Provider, { value: client, children });
}
function useSelfClient() {
  const ctx = useContext(SelfClientContext);
  if (!ctx) throw new Error("useSelfClient must be used within a SelfClientProvider");
  return ctx;
}

// src/hooks/useDocumentManager.ts
import { useCallback, useEffect, useState } from "react";
var useDocumentManager = (external) => {
  const [documents, setDocuments] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    external.getAllDocuments().then((documents2) => {
      setDocuments(documents2);
      setIsLoading(false);
    }).catch((error) => {
      console.error("Failed to load documents:", error);
      setIsLoading(false);
    });
  }, [external]);
  const hasRegisteredDocuments = useCallback(() => {
    return Object.values(documents).some((doc) => doc.metadata.isRegistered);
  }, [documents]);
  return {
    documents,
    isLoading,
    hasRegisteredDocuments,
    setDocuments
  };
};

// src/components/flows/OnboardingFlow.tsx
import { useCallback as useCallback3, useState as useState2 } from "react";

// src/components/screens/NFCScannerScreen.tsx
import { useCallback as useCallback2 } from "react";
import { Button, Text, YStack } from "tamagui";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var NFCScannerScreen = ({ onSuccess, onFailure }) => {
  const client = useSelfClient();
  const onNFCScan = useCallback2(
    async (_nfcData) => {
      try {
        onSuccess();
      } catch (error) {
        onFailure(error);
      }
    },
    [client, onSuccess, onFailure]
  );
  return /* @__PURE__ */ jsxs(YStack, { space: "$4", padding: "$4", children: [
    /* @__PURE__ */ jsx2(Text, { fontSize: "$6", fontWeight: "bold", children: "NFC Scanner" }),
    /* @__PURE__ */ jsx2(Button, { onPress: () => onNFCScan({}), children: "Simulate NFC Scan" })
  ] });
};

// src/components/screens/PassportCameraScreen.tsx
import { Button as Button2, Text as Text2, YStack as YStack2 } from "tamagui";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var PassportCameraScreen = ({ onMRZDetected }) => /* @__PURE__ */ jsxs2(YStack2, { space: "$4", padding: "$4", children: [
  /* @__PURE__ */ jsx3(Text2, { fontSize: "$6", fontWeight: "bold", children: "Passport Camera" }),
  /* @__PURE__ */ jsx3(
    Button2,
    {
      onPress: () => onMRZDetected({
        passportNumber: "L898902C3",
        dateOfBirth: "740812",
        dateOfExpiry: "120415",
        surname: "ERIKSSON",
        givenNames: "ANNA MARIA",
        sex: "F",
        nationality: "UTO",
        issuingCountry: "UTO",
        documentType: "P",
        validation: {
          format: true,
          passportNumberChecksum: true,
          dateOfBirthChecksum: true,
          dateOfExpiryChecksum: true,
          compositeChecksum: true,
          overall: true
        }
      }),
      children: "Simulate MRZ Detection"
    }
  )
] });

// src/components/flows/OnboardingFlow.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var OnboardingFlow = ({ external, setDocument, PassportCamera, NFCScanner }) => {
  const [mrzData, setMrzData] = useState2(null);
  const client = useSelfClient();
  const handleMRZDetected = useCallback3(
    async (mrzData2) => {
      try {
        const status = await client.registerDocument({
          scan: {
            mode: "mrz",
            passportNumber: mrzData2.passportNumber,
            dateOfBirth: mrzData2.dateOfBirth,
            dateOfExpiry: mrzData2.dateOfExpiry,
            issuingCountry: mrzData2.issuingCountry
          }
        });
        if (status.registered) {
          setMrzData(mrzData2);
        } else {
          external.onOnboardingFailure(new Error("Registration failed"));
        }
      } catch (error) {
        external.onOnboardingFailure(error);
      }
    },
    [client, external, setDocument]
  );
  if (!mrzData) {
    if (PassportCamera) {
      const PCam = PassportCamera;
      return /* @__PURE__ */ jsx4(PCam, { onMRZDetected: handleMRZDetected });
    }
    return /* @__PURE__ */ jsx4(PassportCameraScreen, { onMRZDetected: handleMRZDetected });
  }
  if (NFCScanner) {
    const NFC = NFCScanner;
    return /* @__PURE__ */ jsx4(NFC, { onSuccess: external.onOnboardingSuccess, onFailure: external.onOnboardingFailure });
  }
  return /* @__PURE__ */ jsx4(NFCScannerScreen, { onSuccess: external.onOnboardingSuccess, onFailure: external.onOnboardingFailure });
};

// src/components/screens/QRCodeScreen.tsx
import { Button as Button3, Text as Text3, YStack as YStack3 } from "tamagui";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var QRCodeScreen = ({ onSuccess, onFailure }) => /* @__PURE__ */ jsxs3(YStack3, { space: "$4", padding: "$4", children: [
  /* @__PURE__ */ jsx5(Text3, { fontSize: "$6", fontWeight: "bold", children: "QR Code Scanner" }),
  /* @__PURE__ */ jsx5(Button3, { onPress: onSuccess, children: "Simulate Success" }),
  /* @__PURE__ */ jsx5(Button3, { variant: "outlined", onPress: () => onFailure(new Error("QR scan failed")), children: "Simulate Failure" })
] });

// src/components/SelfMobileSdk.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
var SelfMobileSdkContent = ({
  external,
  customScreens = {}
}) => {
  const { documents, isLoading, hasRegisteredDocuments } = useDocumentManager(external);
  if (isLoading) {
    return /* @__PURE__ */ jsx6("div", { children: "Loading documents..." });
  }
  const hasDocuments = Object.keys(documents).length > 0 && hasRegisteredDocuments();
  if (!hasDocuments) {
    return /* @__PURE__ */ jsx6(
      OnboardingFlow,
      {
        external,
        setDocument: external.setDocument,
        PassportCamera: customScreens.PassportCamera,
        NFCScanner: customScreens.NFCScanner
      }
    );
  }
  return customScreens.QRScanner || /* @__PURE__ */ jsx6(QRCodeScreen, { onSuccess: external.onDisclosureSuccess, onFailure: external.onDisclosureFailure });
};
var SelfMobileSdk = ({ config, adapters = {}, external, children, customScreens }) => {
  return /* @__PURE__ */ jsx6(SelfClientProvider, { config, adapters, children: children || /* @__PURE__ */ jsx6(SelfMobileSdkContent, { external, customScreens }) });
};

// src/mrz/index.ts
async function scanMRZ(_opts) {
  throw notImplemented("scanMRZ");
}

// src/validation/document.ts
import { hash } from "@selfxyz/common/utils/hash/sha";
import { formatMrz } from "@selfxyz/common/utils/passportFormat";
function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
var SUPPORTED_HASH_FUNCTIONS = ["sha256", "sha384", "sha512"];
function isSupportedHashAlgorithm(x) {
  return SUPPORTED_HASH_FUNCTIONS.includes(x);
}
function isPassportDataValid(passportData, callbacks = {}) {
  const {
    onPassportDataNull,
    onPassportMetadataNull,
    onDg1HashFunctionNull,
    onEContentHashFunctionNull,
    onSignedAttrHashFunctionNull,
    onDg1HashMismatch,
    onUnsupportedHashAlgorithm,
    onDg1HashMissing
  } = callbacks;
  if (!passportData) {
    onPassportDataNull?.();
    return false;
  }
  const { passportMetadata } = passportData;
  if (!passportMetadata) {
    onPassportMetadataNull?.(passportData);
    return false;
  }
  const { dg1HashFunction, eContentHashFunction, signedAttrHashFunction } = passportMetadata;
  if (!dg1HashFunction) {
    onDg1HashFunctionNull?.(passportData);
    return false;
  }
  if (!eContentHashFunction) {
    onEContentHashFunctionNull?.(passportData);
    return false;
  }
  if (!signedAttrHashFunction) {
    onSignedAttrHashFunctionNull?.(passportData);
    return false;
  }
  const dg1Algo = dg1HashFunction.toLowerCase();
  const eContentAlgo = eContentHashFunction.toLowerCase();
  const signedAttrAlgo = signedAttrHashFunction.toLowerCase();
  if (!isSupportedHashAlgorithm(dg1Algo)) {
    onUnsupportedHashAlgorithm?.("dg1", dg1Algo, passportData);
    return false;
  }
  if (!isSupportedHashAlgorithm(eContentAlgo)) {
    onUnsupportedHashAlgorithm?.("eContent", eContentAlgo, passportData);
    return false;
  }
  if (!isSupportedHashAlgorithm(signedAttrAlgo)) {
    onUnsupportedHashAlgorithm?.("signedAttr", signedAttrAlgo, passportData);
    return false;
  }
  if (!passportData.mrz) {
    return false;
  }
  if (passportData.dg1Hash && passportData.dg1Hash.length > 0) {
    try {
      const hashResult = hash(dg1Algo, formatMrz(passportData.mrz));
      if (!Array.isArray(hashResult) || !hashResult.every((n) => typeof n === "number" && Number.isFinite(n))) {
        return false;
      }
      const expected = hashResult;
      if (!arraysEqual(passportData.dg1Hash, expected)) {
        onDg1HashMismatch?.(passportData);
        return false;
      }
    } catch (e) {
      console.error("Error calculating DG1 hash:", e);
      return false;
    }
  } else {
    onDg1HashMissing?.(passportData);
  }
  return true;
}

// src/processing/nfc.ts
var createTextDecoder = () => {
  if (typeof globalThis !== "undefined" && "TextDecoder" in globalThis) {
    return new globalThis.TextDecoder("utf-8", { fatal: true });
  }
  if (typeof globalThis.global !== "undefined" && globalThis.global && "TextDecoder" in globalThis.global) {
    return new globalThis.global.TextDecoder("utf-8", { fatal: true });
  }
  if (typeof globalThis.process !== "undefined" && globalThis.process?.versions?.node) {
    try {
      const req = typeof __require === "function" ? __require : void 0;
      const util = req ? req("node:util") : void 0;
      if (util?.TextDecoder) {
        return new util.TextDecoder("utf-8", { fatal: true });
      }
    } catch {
    }
  }
  throw new NfcParseError(
    "TextDecoder not available in this environment. This SDK requires TextDecoder support which is available in modern browsers, Node.js, and React Native."
  );
};
var DECODER;
var getDecoder = () => {
  if (!DECODER) DECODER = createTextDecoder();
  return DECODER;
};
var TAG_DG1 = 97;
var TAG_DG2 = 117;
function readLength(view, offset) {
  if (offset >= view.length) {
    throw new NfcParseError("Unexpected end of data while reading length");
  }
  const first = view[offset];
  if (first & 128) {
    const bytes = first & 127;
    if (bytes === 0) {
      throw new NfcParseError("Indefinite length (0x80) not supported");
    }
    if (offset + bytes >= view.length) {
      throw new NfcParseError("Unexpected end of data while reading long-form length");
    }
    let len = 0;
    for (let j = 1; j <= bytes; j++) {
      len = len << 8 | view[offset + j];
    }
    return { length: len, next: offset + 1 + bytes };
  }
  return { length: first, next: offset + 1 };
}
function parseNFCResponse(bytes) {
  const result = {};
  let i = 0;
  while (i < bytes.length) {
    const tag = bytes[i++];
    if (i >= bytes.length) throw new NfcParseError("Unexpected end of data");
    const { length, next } = readLength(bytes, i);
    i = next;
    if (i + length > bytes.length) throw new NfcParseError("Unexpected end of data");
    const value = bytes.slice(i, i + length);
    i += length;
    switch (tag) {
      case TAG_DG1: {
        result.dg1 = { mrz: getDecoder().decode(value) };
        break;
      }
      case TAG_DG2: {
        result.dg2 = { image: value };
        break;
      }
      default: {
        break;
      }
    }
  }
  return result;
}

// src/nfc/index.ts
async function scanNFC(_opts) {
  throw notImplemented("scanNFC");
}

// src/qr/index.ts
async function scanQRProof(_opts) {
  throw notImplemented("scanQRProof");
}

// src/adapters/web/shims.ts
var webScannerShim = {
  async scan(opts) {
    switch (opts.mode) {
      case "qr":
        return { mode: "qr", data: "self://stub-qr" };
      case "mrz":
        throw sdkError("MRZ scan not supported in web shim", SCANNER_ERROR_CODES.UNAVAILABLE, "scanner");
      case "nfc":
        throw sdkError("NFC not supported in web shim", SCANNER_ERROR_CODES.NFC_NOT_SUPPORTED, "scanner");
      default:
        throw sdkError("Unknown scan mode", SCANNER_ERROR_CODES.INVALID_MODE, "scanner");
    }
  }
};
export {
  SCANNER_ERROR_CODES,
  SelfClientContext,
  SelfClientProvider,
  SelfMobileSdk as SelfMobileSdkHighLevel,
  createSelfClient,
  defaultConfig,
  extractMRZInfo,
  formatDateToYYMMDD,
  isPassportDataValid,
  mergeConfig,
  notImplemented,
  parseNFCResponse,
  scanMRZ,
  scanNFC,
  scanQRProof,
  sdkError,
  useSelfClient,
  webScannerShim
};
//# sourceMappingURL=browser.js.map