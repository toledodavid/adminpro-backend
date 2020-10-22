require('dotenv').config();

const express = require('express');
const cors = require('cors')

const {dbConnection} = require('./database/config');

// Create express server
const app = express();

// Configure CORDS
app.use(cors());

// Database
dbConnection();

//Routes
app.get('/', (request, response) => {
  response.json({
    ok: true,
    msg: 'Hello world'
  });
});

app.listen(process.env.PORT, () => {
  console.log('Running server in port ' + process.env.PORT);
});
