const express = require('express');// importing the library
const db = require('./config/keys');
const mongoose = require('mongoose');
const app = express(); // referring to the instance of express with name app

//Let's write our first route
app.get('/', (req, res) => res.send('Hello server'));

//Connect to db
mongoose.connect(db.mongoURI)
          .then(() => console.log('MongoDB connected')) //promise statement
          .catch((err) => console.log(err) ); //promise statement


const port = 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));