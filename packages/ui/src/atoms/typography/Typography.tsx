'use client';

import { Typography as AntTypography } from 'antd';
import type { TextProps } from 'antd/es/typography/Text';

export type TypographyProps = TextProps;

export function Typography(props: TypographyProps) {
  return <AntTypography.Text {...props} />;
}
