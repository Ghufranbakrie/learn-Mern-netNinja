require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workRoutes = require('./routes/workouts');

// express app
const app = express();


// middleware
app.use(express.json());    // parse json data

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workRoutes);

// connect to mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error)
    });



process.env