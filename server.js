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

app.get('/tasks', (request, response) =>
  sqlClient.query(`SELECT * from tasks;`)
    .then(results => response.send(results.rows))
    .catch(console.log(response))
)

app.get('/', (request, response) =>
  response.send('Testing!')
)

sqlClient.connect();
sqlClient.on('error', err => {
  console.log('Problem with SQL connection.');
  console.log(err);
})

app.get('*', (request, response) => response.redirect(CLIENT_URL));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

app.get('/app', (request, response) =>
  response.send('Hello This is VergilPrime')
)

// TODO: I don't understand this syntax, also the json data doesn't get passed
function loadDB() {
  sqlClient.query(`
    CREATE TABLE IF NOT EXISTS
    tasks(
      id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      description VARCHAR(255),
      contact VARCHAR(255),
      status VARCHAR(255),
      category VARCHAR(255),
      due VARCHAR(255),
    )
  `)
    .then()
    .catch(
      console.log('There was a problem instantiating the SQL table')
    );
}

// TODO: I just added this line as a patch so once I figure out when loadDB is called I can remove it.
loadDB();
