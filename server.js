'use strict';

const express = require('express')

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

app.get('/test', (request, response) =>
  response.send('Woot! Proof of life!')
)
