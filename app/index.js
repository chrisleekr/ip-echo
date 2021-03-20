const { app, logger } = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info({ port }, 'IP Echo server started.');
});
