const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')

//Load env vars
dotenv.config({path: './config/config.env'});

//Connect to database
connectDB();

//Route files
const menu = require('./routes/menu');

const app = express();

//Body Parser
app.use(express.json())

//Custom logging middleware (unused)
//app.use(logger);

//Using Morgan instead (dev logging middleware)
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//File uploading
app.use(fileupload());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount routers
app.use('/api/v1/menu', menu);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT, 
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//Handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(() => process.exit(1));
});
