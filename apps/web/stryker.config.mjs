export default {
  mutate: ['src/utils/**/*.ts'],
  testRunner: 'vitest',
  coverageAnalysis: 'perTest',
  reporters: ['clear-text', 'html'],
  thresholds: { high: 80, low: 60, break: 50 },
};
