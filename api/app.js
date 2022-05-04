// Require Dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config/config.json');
const db = require('./config/db.json');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Connect with mongoose
const connString = `mongodb://${db[config.env].host}:${db[config.env].port}/${db[config.env].database}?authSource=admin&w=1`;
mongoose.connect(connString,{
    auth: {
        username: db[config.env].user,
        password: db[config.env].password
    },
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Successfully connected to mongodb');
}).catch((err)=>{
    console.error("connection error",err);
})


// Instantiate an Express Application
const app = express();
const PORT = process.env.PORT || config.port

// Configure Express App Instance
app.use(express.json( { limit: '50mb' } ));
app.use(express.urlencoded( { extended: true, limit: '10mb' } ));

// Configure custom logger middleware
app.use(morgan('dev'));

app.use(cookieParser());
app.use(cors());
app.use(helmet());

// This middleware adds the json header to every response
app.use('*', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})

// Assign Routes

app.use('/', require('./routes/index.js'));



// Handle not valid route
app.use('*', (req, res) => {
    res
    .status(404)
    .json( {status: false, message: 'Endpoint Not Found'} );
})

// Open Server on selected Port
app.listen(
    PORT,
    () => console.info('Server listening on port ', PORT)
);