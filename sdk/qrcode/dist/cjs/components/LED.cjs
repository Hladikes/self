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

// components/LED.tsx
var LED_exports = {};
__export(LED_exports, {
  default: () => LED_default
});
module.exports = __toCommonJS(LED_exports);
var import_react = __toESM(require("react"), 1);

// utils/utils.ts
var QRcodeSteps = {
  DISCONNECTED: 0,
  WAITING_FOR_MOBILE: 1,
  MOBILE_CONNECTED: 2,
  PROOF_GENERATION_STARTED: 3,
  PROOF_GENERATION_FAILED: 4,
  PROOF_GENERATED: 5,
  PROOF_VERIFIED: 6
};

// components/LED.tsx
var green = "#31F040";
var blue = "#424AD8";
var gray = "#95a5a6";
var LED = ({ size = 8, connectionStatus = QRcodeSteps.DISCONNECTED }) => {
  const getColor = () => {
    if (connectionStatus >= QRcodeSteps.MOBILE_CONNECTED) {
      return green;
    } else if (connectionStatus >= QRcodeSteps.WAITING_FOR_MOBILE) {
      return blue;
    } else {
      return gray;
    }
  };
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      style: {
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        backgroundColor: getColor(),
        boxShadow: `0 0 ${size * 1.5}px ${getColor()}`,
        transition: "all 0.3s ease",
        marginBottom: "8px"
      }
    }
  );
};
var LED_default = LED;
//# sourceMappingURL=LED.cjs.map