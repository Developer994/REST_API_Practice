const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

// Set up express app
const app = express();

// Connect to mongodb
mongoose.connect('mongodb://localhost/ninjago', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(express.static('public'));

// Here, we start to use the body-parser by inputting the line on line 8. It has to come before the route handler. 
app.use(bodyParser.json())

// Initializing routes
// In the app.use below, instead of doing const routes = require('routes'), we just added it into the query.
app.use('/api', require('./routes/api')); // Adding the api in front of require will result in the route being /api/ninjas instead of /ninjas for a get request, for example.


// Middleware for error handling.
app.use(function (err, req, res, next) {
    // console.log(err)
    res.status(422).send({ error: err.message })
})

// Listen for express  
app.listen(process.env.port || 4000, function () {
    console.log('now listening for requests')
})