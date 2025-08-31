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

// utils/websocket.ts
var websocket_exports = {};
__export(websocket_exports, {
  initWebSocket: () => initWebSocket
});
module.exports = __toCommonJS(websocket_exports);
var import_socket = require("socket.io-client");

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

// utils/websocket.ts
console.log("[WebSocket] Initializing websocket module.");
var validateWebSocketUrl = (websocketUrl) => {
  if (websocketUrl.includes("localhost") || websocketUrl.includes("127.0.0.1")) {
    throw new Error("localhost websocket URLs are not allowed");
  }
};
var newSocket = (websocketUrl, sessionId) => {
  const fullUrl = `${websocketUrl}/websocket`;
  console.log(`[WebSocket] Creating new socket. URL: ${fullUrl}, sessionId: ${sessionId}`);
  return (0, import_socket.io)(fullUrl, {
    path: "/",
    query: { sessionId, clientType: "web" },
    transports: ["websocket"]
  });
};
var handleWebSocketMessage = (socket, sessionId, selfApp, type, setProofStep, onSuccess, onError) => async (data) => {
  console.log("[WebSocket] Received mobile status:", data.status, "for session:", sessionId);
  switch (data.status) {
    case "mobile_connected":
      console.log(
        "[WebSocket] Mobile device connected. Emitting self_app event with payload:",
        selfApp
      );
      setProofStep(QRcodeSteps.MOBILE_CONNECTED);
      if (type === "websocket") {
        socket.emit("self_app", { ...selfApp, sessionId });
      }
      break;
    case "mobile_disconnected":
      console.log("[WebSocket] Mobile device disconnected.");
      setProofStep(QRcodeSteps.WAITING_FOR_MOBILE);
      break;
    case "proof_generation_started":
      console.log("[WebSocket] Proof generation started.");
      setProofStep(QRcodeSteps.PROOF_GENERATION_STARTED);
      break;
    case "proof_generated":
      console.log("[WebSocket] Proof generated.");
      setProofStep(QRcodeSteps.PROOF_GENERATED);
      break;
    case "proof_generation_failed":
      console.log("[WebSocket] Proof generation failed.");
      setProofStep(QRcodeSteps.PROOF_GENERATION_FAILED);
      onError(data);
      break;
    case "proof_verified":
      console.log("[WebSocket] Proof verified.");
      console.log("ws data", data);
      setProofStep(QRcodeSteps.PROOF_VERIFIED);
      onSuccess();
      break;
    default:
      console.log("[WebSocket] Unhandled mobile status:", data.status);
      break;
  }
};
function initWebSocket(websocketUrl, selfApp, type, setProofStep, onSuccess, onError) {
  validateWebSocketUrl(websocketUrl);
  const sessionId = selfApp.sessionId;
  console.log(`[WebSocket] Initializing WebSocket connection for sessionId: ${sessionId}`);
  const socket = newSocket(websocketUrl, sessionId);
  socket.on("connect", () => {
    console.log(
      `[WebSocket] Connected with id: ${socket.id}, transport: ${socket.io.engine.transport.name}`
    );
  });
  socket.on("connect_error", (error) => {
    console.error("[WebSocket] Connection error:", error);
  });
  socket.on("mobile_status", (data) => {
    console.log("[WebSocket] Raw mobile_status event received:", data);
    handleWebSocketMessage(
      socket,
      sessionId,
      selfApp,
      type,
      setProofStep,
      onSuccess,
      onError
    )(data);
  });
  socket.on("disconnect", (reason) => {
    console.log(
      `[WebSocket] Disconnected. Reason: ${reason}, Last transport: ${socket.io.engine.transport?.name}`
    );
  });
  return () => {
    console.log(`[WebSocket] Cleaning up connection for sessionId: ${sessionId}`);
    if (socket) {
      socket.disconnect();
    }
  };
}
//# sourceMappingURL=websocket.cjs.map