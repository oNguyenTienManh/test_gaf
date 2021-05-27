const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const nextI18NextMiddleware = require('next-i18next/middleware').default;

const nextI18next = require('./src/i18n');

const port = process.env.PORT || 8080;
const app = next({ dev: process.env.NODE_ENV !== 'production', quiet: true });
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const server = express();

  await nextI18next.initPromise;
  server.use(nextI18NextMiddleware(nextI18next));
  server.use(cookieParser());

  server.get('*', (req, res) => handle(req, res));

  await server.listen(port);
  console.log(`Server is running at port ${port}`); // eslint-disable-line
})();
