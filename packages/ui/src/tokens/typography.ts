export const typography = {
  fontFamily: "IranSans, Arial, sans-serif",
  fontSize: { sm: 12, md: 14, lg: 16, xl: 20, '2xl': 24 },
  fontWeight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
  lineHeight: { tight: 1.25, normal: 1.5, relaxed: 1.75 },
} as const;

export type TypographyToken = keyof typeof typography;
