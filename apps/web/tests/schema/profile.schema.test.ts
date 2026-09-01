import { describe, expect, it } from 'vitest';

import { ProfileSchema } from './profile.schema';

describe('ProfileSchema', () => {
  it('rejects malformed backend payloads', () => {
    expect(() => ProfileSchema.parse({ id: '1' })).toThrow();
  });
});
