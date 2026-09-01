module.exports = {
  ci: {
    collect: { numberOfRuns: 3, url: ['http://127.0.0.1:3100/'] },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 4000 }],
      },
    },
    upload: { target: 'temporary-public-storage' },
  },
};
