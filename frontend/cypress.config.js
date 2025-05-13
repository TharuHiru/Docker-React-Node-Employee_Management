const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Your React app's URL
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})