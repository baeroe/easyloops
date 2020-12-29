// get environment variables
require('dotenv').config()

// set global variables
PORT = process.env.PORT || 3000
DB_URL = process.env.DB_URL

// load dependencies
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// load routes
const userRoutes = require('./routes/user-routes')
const authRoutes = require('./routes/auth-routes')
const loopRoutes = require('./routes/loop-routes')

// start express app
const app = express()

// connect with database
mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(console.log('connected'))
    .catch(err => console.log(err))

// middleware that the app can read json body data
app.use(bodyParser.json({limit: '50mb'}));

// middleware to make api requests possible
app.use(cors())

// set routes
app.use('/api', userRoutes)
app.use('/api', authRoutes)
app.use('/api', loopRoutes)

// test route
app.get('/api/test', (req, res) => {
    res.send('success')
})

app.listen(PORT, () => {
    console.log('listening to port ' + PORT)
})