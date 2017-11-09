'use strict';

const express = require('express');
const pg = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;
const SQL_URL = process.env.DATABASE_URL;

const sqlClient = new pg.Client(SQL_URL);
sqlClient.connect();

sqlClient.on('error', function(err) {
  console.log('Problem with SQL Connection:\n' + err);
});

// postgres://fmpthvocildipl:f4bd1be037fb83b8d4440774a73f6a2f1f54c71dc45e5ae41c2242e83f4ce4bb@ec2-54-163-255-181.compute-1.amazonaws.com:5432/df5aldphdr9fei

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

app.get('/test', (request, response) =>
  response.send('Woot! Proof of life!')
)
