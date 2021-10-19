const express = require('express');// importing the library
const app = express(); // referring to the instance of express with name app

//Let's write our first route
app.get('/', (req, res) => res.send('Hello'));

const port = 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));