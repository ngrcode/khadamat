import { defineConfig } from 'orval';

export default defineConfig({
  khadamatGostar: {
    input: {
      target: 'http://62.60.165.23:50051/swagger/v1/swagger.json',
      override: {
        transformer: './src/configs/orval/transformOpenApi.ts',
      },
    },
    output: {
      mode: 'tags-split',
      target: './src/generated/api/khadamat-gostar.ts',
      schemas: './src/generated/api/model',
      client: 'react-query',
      httpClient: 'axios',
      clean: true,
      prettier: true,
      override: {
        mutator: {
          path: './src/configs/httpService/orval/customInstance.ts',
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
