# Generated API Client

This directory is populated by Orval from the configured OpenAPI document.

Generate the client from the admin app:

```bash
npm run api:generate
```

Override the OpenAPI source when needed:

```bash
OPENAPI_URL=https://portal2.kh-poshtibani.ir/swagger/v1/swagger.json npm run api:generate
```

Generated endpoint hooks are split by OpenAPI tag and models are written to `model/`.
Do not manually edit generated TypeScript files.
