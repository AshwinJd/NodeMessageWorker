const path = require('path');
const extend = require('util')._extend;

const development = require('./env/development.js');
const production = require('./env/production.js');
const test = require('./env/test.js');

const defaults = {
  SERVER_ROOT: path.resolve(__dirname, '../'),
  NODE_ENV: process.env.NODE_ENV,
};

const appConfig = {
  development: extend(development, defaults),
  test: extend(test, defaults),
  production: extend(production, defaults),
};

const effectiveENV = (process.env.NODE_ENV || 'development');

process.stdout.write(`\nConfiguring for environment: ${effectiveENV}`);

const effectiveConfig = appConfig[effectiveENV];
process.stdout.write(`\nconfig settings: ${JSON.stringify(effectiveConfig)}\n`);

module.exports = effectiveConfig;
