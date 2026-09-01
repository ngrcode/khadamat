import { MatchersV3, PactV3 } from '@pact-foundation/pact';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { server } from '../mocks/server';

const runContract = process.env.CONTRACT_TESTS === '1';
const pact = new PactV3({ consumer: 'web', provider: 'khadamat-gostar-api' });

describe.skipIf(!runContract)('profile contract', () => {
  beforeAll(() => server.close());
  afterAll(() => server.listen({ onUnhandledRequest: 'error' }));

  it('defines the profile response consumed by the frontend', async () => {
    pact.addInteraction({
      states: [{ description: 'an authenticated profile exists' }],
      uponReceiving: 'a profile request',
      withRequest: { method: 'GET', path: '/api/profile' },
      willRespondWith: {
        status: 200,
        body: MatchersV3.like({ id: 1, firstName: 'سارا', lastName: 'احمدی', role: 'admin' }),
      },
    });
    await pact.executeTest(async (mockServer) => {
      const response = await fetch(`${mockServer.url}/api/profile`);
      expect(response.status).toBe(200);
    });
  });
});
