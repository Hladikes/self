<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { QrcodeSvg } from 'qrcode.vue';

import type { SelfApp } from '@selfxyz/common';
import { getUniversalLink, REDIRECT_URL, WS_DB_RELAYER } from '@selfxyz/common';
import { containerStyle, qrContainerStyle } from '../utils/styles.ts';
import { QRcodeSteps } from '../utils/utils.ts';
import { initWebSocket } from '../utils/websocket.ts';

interface Props {
  selfApp: SelfApp;
  onSuccess: () => void;
  onError: (data: { error_code?: string; reason?: string }) => void;
  type?: 'websocket' | 'deeplink';
  websocketUrl?: string;
  size?: number;
  darkMode?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'websocket',
  websocketUrl: WS_DB_RELAYER,
  size: 300,
  darkMode: false,
});

const proofStep = ref(QRcodeSteps.WAITING_FOR_MOBILE);
const sessionId = ref('');
let socket: ReturnType<typeof initWebSocket> | null = null;

function cleanup() {
  console.log('[QRCode] Cleaning up WebSocket connection');
  if (socket) {
    socket = null;
  }
}

watch([sessionId, () => props], () => {
  if (sessionId.value && !socket) {
    socket = initWebSocket(
      props.websocketUrl,
      {
        ...props.selfApp,
        sessionId: sessionId.value,
      },
      props.type,
      (n: number) => {
        console.log('reach point');
        proofStep.value = n;
      },
      () => {
        props.onSuccess();
      },
      (args) => {
        props.onError(args);
      }
    );
  }

  cleanup();
});

onMounted(() => {
  sessionId.value = uuidv4();
});

onUnmounted(cleanup);

const qrValue = computed(() =>
  props.type === 'websocket'
    ? `${REDIRECT_URL}?sessionId=${sessionId.value}`
    : getUniversalLink({
        ...props.selfApp,
        sessionId: sessionId.value,
      })
);
</script>

<template>
  <div :style="containerStyle">
    <div :style="qrContainerStyle(props.size)">
      <template v-if="proofStep === QRcodeSteps.PROOF_GENERATION_STARTED || proofStep === QRcodeSteps.PROOF_GENERATED">
        <div style="flex: 1;">PROOF_GENERATED</div>
      </template>

      <template v-else-if="proofStep === QRcodeSteps.PROOF_GENERATION_FAILED">
        <div style="flex: 1;">PROOF_GENERATION_FAILED</div>
      </template>

      <template v-else-if="proofStep === QRcodeSteps.PROOF_VERIFIED">
        <div style="flex: 1;">PROOF_VERIFIED</div>
      </template>

      <template v-else>
        <QrcodeSvg
          :value="qrValue"
          :size="props.size"
          :background="props.darkMode ? '#000000' : '#FFFFFF'"
          :foreground="props.darkMode ? '#FFFFFF' : '#000000'"
        />
      </template>
    </div>
  </div>
</template>

