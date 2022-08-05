const { defineConfig } = require("cypress");
//const Mochawesome = require("mochawesome");
//const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
  projectId: '3e3ey4',
  videoCompression: 15,
  defaultCommandTimeout: 120000,
  env:{
    url: "https://rb-shoe-store.herokuapp.com/"
  },

  e2e: {
    setupNodeEvents(on, config) {
      //on('file:preprocessor', cucumber())
    },
    //specPattern: 'cypress/integration/examples/BDD/*.feature'
    specPattern: 'cypress/integration/examples/*.js'
  },
});
