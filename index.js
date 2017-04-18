
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cookieParser = require('cookie-parser')

if (process.env.NODE_ENV !== "production") {
    require('dotenv').load()
}

var exports = module.exports = {};

const enableCORS = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.get('origin'));

    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

const app = express()
app.use(logger('default'))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(enableCORS)

require('./src/articles.js').endpoints(app)
require('./src/profile.js').endpoints(app)

//require('./src/uploadCloudinary.js').setup(app)
require('./src/auth.js').endpoints(app)
// Get the port from the environment, i.e., Heroku sets it


const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
