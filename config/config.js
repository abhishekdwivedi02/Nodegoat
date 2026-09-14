const _ = require("underscore");
const path = require("path");
const util = require("util");

const finalEnv = process.env.NODE_ENV || "development";

const allConf = require(path.resolve(__dirname + "/../config/env/all.js"));
const envConf = require(path.resolve(__dirname + "/../config/env/" + finalEnv.toLowerCase() + ".js")) || {};

const config = { ...allConf, ...envConf };

// Log a sanitized view of the config: never print secrets (CWE-532)
const sanitizedConfig = {
    ...config,
    cookieSecret: "****",
    cryptoKey: "****",
    db: config.db.replace(/\/\/[^@/]*:[^@]*@/, "//****:****@")
};

console.log(`Current Config (secrets redacted):`);
console.log(util.inspect(sanitizedConfig, false, null));

module.exports = config;
