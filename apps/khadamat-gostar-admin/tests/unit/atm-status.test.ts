import { describe, expect, it } from 'vitest';

import { atmStatusColors, atmStatusLabels } from '../../src/features/atm/model/atm-status';

describe('ATM status metadata', () => {
  it('maps every supported status to a label and a color', () => {
    expect(atmStatusLabels.active).toBe('فعال');
    expect(atmStatusColors.maintenance).toBe('warning');
    expect(Object.keys(atmStatusLabels)).toEqual(Object.keys(atmStatusColors));
  });
});
