var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/appType.ts
var appType_exports = {};
__export(appType_exports, {
  SelfAppBuilder: () => SelfAppBuilder,
  getUniversalLink: () => getUniversalLink
});
module.exports = __toCommonJS(appType_exports);
var import_uuid = require("uuid");

// src/constants/constants.ts
var REDIRECT_URL = "https://redirect.self.xyz";

// src/utils/circuits/uuid.ts
function validateUserId(userId, type) {
  switch (type) {
    case "hex":
      return /^[0-9A-Fa-f]+$/.test(userId);
    case "uuid":
      return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        userId
      );
    default:
      return false;
  }
}

// src/utils/scope.ts
var import_poseidon_lite = require("poseidon-lite");
function formatEndpoint(endpoint) {
  if (!endpoint) return "";
  return endpoint.replace(/^https?:\/\//, "").split("/")[0];
}

// src/utils/appType.ts
var SelfAppBuilder = class {
  constructor(config) {
    if (!config.appName) {
      throw new Error("appName is required");
    }
    if (!config.scope) {
      throw new Error("scope is required");
    }
    if (!config.endpoint) {
      throw new Error("endpoint is required");
    }
    if (!/^[\x00-\x7F]*$/.test(config.scope)) {
      throw new Error("Scope must contain only ASCII characters (0-127)");
    }
    if (!/^[\x00-\x7F]*$/.test(config.endpoint)) {
      throw new Error("Endpoint must contain only ASCII characters (0-127)");
    }
    if (config.scope.length > 31) {
      throw new Error("Scope must be less than 31 characters");
    }
    const formattedEndpoint = formatEndpoint(config.endpoint);
    if (formattedEndpoint.length > 496) {
      throw new Error(
        `Endpoint must be less than 496 characters, current endpoint: ${formattedEndpoint}, length: ${formattedEndpoint.length}`
      );
    }
    if (!config.userId) {
      throw new Error("userId is required");
    }
    if (config.endpointType === "https" && !config.endpoint.startsWith("https://")) {
      throw new Error("endpoint must start with https://");
    }
    if (config.endpointType === "celo" && !config.endpoint.startsWith("0x")) {
      throw new Error("endpoint must be a valid address");
    }
    if (config.endpoint && (config.endpoint.includes("localhost") || config.endpoint.includes("127.0.0.1"))) {
      throw new Error("localhost endpoints are not allowed");
    }
    if (config.userIdType === "hex") {
      if (!config.userId.startsWith("0x")) {
        throw new Error("userId as hex must start with 0x");
      }
      config.userId = config.userId.slice(2);
    }
    if (!validateUserId(config.userId, config.userIdType ?? "uuid")) {
      throw new Error("userId must be a valid UUID or address");
    }
    this.config = {
      sessionId: (0, import_uuid.v4)(),
      userIdType: "uuid",
      devMode: false,
      endpointType: "https",
      header: "",
      logoBase64: "",
      deeplinkCallback: "",
      disclosures: {},
      chainID: config.endpointType === "staging_celo" ? 44787 : 42220,
      version: config.version ?? 2,
      userDefinedData: "",
      ...config
    };
  }
  build() {
    return this.config;
  }
};
function getUniversalLink(selfApp) {
  return `${REDIRECT_URL}?selfApp=${encodeURIComponent(JSON.stringify(selfApp))}`;
}
//# sourceMappingURL=appType.cjs.map