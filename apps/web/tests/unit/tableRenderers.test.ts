import { describe, expect, it } from 'vitest';

import {
  renderCurrency,
  renderNumber,
  renderText,
} from '@/components/Table/renderers/tableRenderers';

describe('table renderers', () => {
  it('formats numeric values with Persian locale separators', () => {
    expect(renderNumber(12000)).toBe(Number(12000).toLocaleString('fa-IR'));
    expect(renderCurrency('3500000')).toBe(
      Number(3500000).toLocaleString('fa-IR')
    );
  });

  it('returns fallback text for empty or invalid values', () => {
    expect(renderNumber(null)).toBe('---');
    expect(renderCurrency('not-a-number')).toBe('---');
    expect(renderText('')).toBe('---');
  });

  it('keeps regular text values unchanged', () => {
    expect(renderText('TicketReport')).toBe('TicketReport');
  });
});
