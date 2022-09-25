const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

//Route files
const menu = require('./routes/menu');

//Load env vars
dotenv.config({path: './config/config.env'});

const app = express();

//Custom logging middleware (unused)
//app.use(logger);

//Using Morgan instead (dev logging middleware)
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Mount routers
app.use('/api/v1/menu', menu);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT, 
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
