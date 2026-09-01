import { defineConfig } from 'orval';

const openApiUrl =
  process.env.OPENAPI_URL ||
  process.env.NEXT_PUBLIC_OPENAPI_URL ||
  'http://localhost:5000/swagger/v1/swagger.json';

export default defineConfig({
  khadamatGostarAdmin: {
    input: {
      target: openApiUrl,
    },
    output: {
      mode: 'tags-split',
      target: './src/services/generated/api.ts',
      schemas: './src/services/generated/model',
      client: 'react-query',
      httpClient: 'axios',
      override: {
        mutator: {
          path: './src/lib/api/custom-instance.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useMutation: true,
          signal: false,
        },
      },
    },
  },
});
