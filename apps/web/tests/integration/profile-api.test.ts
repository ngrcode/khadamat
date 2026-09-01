import { describe, expect, it } from 'vitest';

import { ProfileSchema } from '../schema/profile.schema';

describe('profile API integration', () => {
  it('accepts the MSW profile response through its schema', async () => {
    const response = await fetch('http://localhost/api/profile');
    expect(response.ok).toBe(true);
    expect(ProfileSchema.parse(await response.json()).role).toBe('admin');
  });
});
