'use strict';

const pg = require('pg');
const express = require('express');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;

//TODO: Figure out how to use process.env.DATABASE_URL
const sqlConString = 'postgres://postgres:password@mc.angels-reach.net:12888/postgres';
const sqlClient = new pg.Client(sqlConString)

app.use(cors());

app.get('/', (request, response) =>
  response.send('Testing!')
)

sqlClient.connect();
sqlClient.on('error', err => {
  console.err('Problem with SQL connection.');
  console.err(err);
})

app.get('*', (request, response) => response.redirect(CLIENT_URL));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

app.get('/app', (request, response) =>
  response.send('Hello This is VergilPrime')
)

sqlClient.query(`
  CREATE TABLE IF NOT EXISTS
  booklist-test(
    test_id SERIAL PRIMARY KEY,
    value TEXT NOT NULL
  )
`)
  .then()
  .catch(
    console.err('There was a problem instantiating the SQL table')
  );
