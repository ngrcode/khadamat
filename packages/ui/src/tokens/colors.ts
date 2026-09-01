export const colors = {
  primary: '#3a1571',
  accent: '#e5007d',
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  info: '#1677ff',
  text: '#1f1f1f',
  textSecondary: '#595959',
  background: '#ffffff',
  border: '#d9d9d9',
} as const;

export type ColorToken = keyof typeof colors;
