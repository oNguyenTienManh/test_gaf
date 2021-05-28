const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 8080;
const app = next({ dev: process.env.NODE_ENV !== 'production', quiet: true });
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const server = express();

  server.use(cookieParser());

  server.get('*', (req, res) => handle(req, res));

  await server.listen(port);
  console.log(`Server is running at port ${port}`); // eslint-disable-line
})();
