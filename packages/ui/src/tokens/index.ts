import { colors } from './colors';
import { radius } from './radius';
import { typography } from './typography';

export const antdThemeToken = {
  borderRadius: radius.md,
  colorPrimary: colors.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSize.md,
} as const;

export { colors } from './colors';
export type { ColorToken } from './colors';
export { radius } from './radius';
export type { RadiusToken } from './radius';
export { spacing } from './spacing';
export type { SpacingToken } from './spacing';
export { typography } from './typography';
export type { TypographyToken } from './typography';
