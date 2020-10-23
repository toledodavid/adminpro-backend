require('dotenv').config();

const express = require('express');
const cors = require('cors')

const {dbConnection} = require('./database/config');

// Create express server
const app = express();

// Configure CORDS
app.use(cors());

// Reading and parse from body
app.use(express.json());

// Database
dbConnection();

//Routes
app.use('/api/users', require('./routes/users.routes'));

app.listen(process.env.PORT, () => {
  console.log('Running server in port ' + process.env.PORT);
});
