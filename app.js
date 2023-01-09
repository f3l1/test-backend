const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes/main.routes'));

try {
    mongoose.connect(        
        'mongodb://localhost:27017/testBackend',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        () => {
            console.log('Conexion satisfactoria de la base de datos')
        }
    )
} catch (e) {
    console.log(e)
}

module.exports = app;
