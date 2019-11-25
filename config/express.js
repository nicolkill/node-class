const express = require('express');
const bodyParser = require('body-parser');
const logger = require('../services/logger');

const logRequest = (req, res, next) => {
  const now = Date.now();

  const chunks = [];
  const oldWrite = res.write;
  const oldEnd = res.end;

  res.write = function (chunk) {
    chunks.push(chunk);

    oldWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk) {
      chunks.push(chunk);
    }

    let body = '{}';
    const contentType = res.getHeader('content-type');
    if (contentType && contentType.indexOf('application/json') >= 0 && chunks.length > 0) {
      body = Buffer.isBuffer(chunks[0]) ? Buffer.concat(chunks).toString('utf8') : chunks[0];
    }

    try {
      body = JSON.parse(body);
    } catch (error) {
      logger.error({
        body,
        error: error.message,
        stack: error.stack,
      });
      body = {};
    }

    logger.info({
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: (Date.now() - now) / 1000,
      request: req.body,
      response: body,
    });

    oldEnd.apply(res, arguments);
  };

  next();
};

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  logger.info({
    error: err,
  });

  res.status(500);
  res.render('error', { error: err });
};

const app = express();

const port = process.env.PORT | 3000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(logRequest);
app.use(errorHandler);

require('../app/users/users.route')(app);

app.listen(port);

console.log(`listening on http://localhost:${port}/`);
