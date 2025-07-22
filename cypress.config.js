const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://niobooks.in',      // ✅ correct live site
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 8000,
  },
});