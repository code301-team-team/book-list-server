'use strict';

console.log('1');
const express = require('express');
const pg = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
//const CLIENT_URL = process.env.CLIENT_URL;
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
);

app.get('/api/v1/books', (request, response) => {
  sqlClient.query(
    `SELECT book_id, title, author, image_url FROM books;`)
    .then(result => {response.send(result.rows)})
    .catch(err => {console.log(err)})
});

app.get('/api/v1/books/:book_id', bodyParser, (request, response) => {
  let {book_id} = request.body
  sqlClient.query(
    `SELECT title, author, image_url, description
     WHERE book_id = $1;`,
    [book_id]
  )
    .then(result => {response.send(result.rows)})
    .catch(err => {console.log(err)})
});

app.post('/api/v1/books/add', bodyParser, (request, response) => {
  sqlClient.query(
    let {title,author,isbn,image_url,description} = request.body;
    `INSERT INTO books (title, author, isbn, image_url, description)
    VALUES ($1, $2, $3, $4, $5);`,
    [title,author,isbn,image_url,description]
  )
    .then(result => {response.sendStatus(201)})
    .catch(err => {console.log(err)})
});
