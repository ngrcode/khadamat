import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useConvertToPersianDigits } from '@/hook/useConvertToPersianDigits';

describe('useConvertToPersianDigits', () => {
  it('converts latin digits inside a string to Persian digits', () => {
    const { result } = renderHook(() => useConvertToPersianDigits());

    expect(result.current.convertToPersianDigits('1405/03/31 16:40')).toBe(
      '۱۴۰۵/۰۳/۳۱ ۱۶:۴۰'
    );
  });
});
