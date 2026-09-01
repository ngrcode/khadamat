# Test setup

This project uses Vitest for fast unit-level coverage, MSW for API mocking, and
Playwright for browser coverage.

## Commands

- `npm run test`: run all Vitest tests in watch mode.
- `npm run test:unit`: run unit, hook, and Zustand store tests.
- `npm run test:component`: run component tests.
- `npm run test:query`: run React Query tests with MSW.
- `npm run test:coverage`: run Vitest once and create coverage reports.
- `npm run test:e2e`: run Playwright E2E and integration tests.
- `npm run test:visual`: run Playwright visual regression tests.
- `npm run test:visual:update`: create or update visual snapshots.

Before running Playwright for the first time on a new machine, install browser
binaries with `npx playwright install`.

## Suggested coverage mix

- 70% unit tests for pure functions, hooks, stores, and data mappers.
- 20% integration tests for React Query flows, forms, and page behavior.
- 10% E2E tests for login, routing, critical dashboards, and visual regressions.
