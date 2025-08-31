// components/LED.tsx
import React from "react";

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
  return /* @__PURE__ */ React.createElement(
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
export {
  LED_default as default
};
//# sourceMappingURL=LED.js.map