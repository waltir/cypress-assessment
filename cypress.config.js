const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: true,
  projectId: 'uhiiqa',
  e2e: {
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://tesla.com',
  },
  env: {
    baseUrl: "https://tesla.com"
  }
});
