import type { StyleValue } from 'vue';

const containerStyle: StyleValue = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
};

const ledContainerStyle: StyleValue = {
  marginBottom: '4px',
};

const qrContainerStyle = (size: number): StyleValue => ({
  width: `${size}px`,
  height: `${size}px`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export { containerStyle };
export { ledContainerStyle };
export { qrContainerStyle };
