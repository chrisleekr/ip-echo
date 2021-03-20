const bunyan = require('bunyan');
const express = require('express');
const { getClientIp } = require('@supercharge/request-ip');
const packageJson = require('../package.json');

const logger = bunyan.createLogger({
  name: 'ip-config',
  version: packageJson.version,
  streams: [{ stream: process.stdout }]
});
const app = express();

app.get('*', (req, res) => {
  const clientIP = getClientIp(req);
  logger.info({ clientIP }, 'IP detected');

  res.status(200).send(clientIP);
});

module.exports = { app, logger };
