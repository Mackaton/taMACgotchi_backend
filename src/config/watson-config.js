require('dotenv').config();

const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
  version: process.env.ASSISTANT_VERSION,
  authenticator: new IamAuthenticator({
    apikey: process.env.ASSISTANT_APIKEY,
  }),
  url: process.env.ASSISTANT_URL,
  disableSslVerification: true,
});

module.exports = { assistant };
