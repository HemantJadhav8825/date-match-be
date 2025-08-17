const serverless = require("serverless-http");
const { app } = require("../index");

console.log({ran_from_serverJS_: true})

module.exports = serverless(app);
