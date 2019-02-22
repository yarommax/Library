const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
//логирование серверный запросов
const morgan = require('morgan');
//Роуты
const authRoutes = require('./routes/auth');
const authorsRoutes = require('./routes/authors');
const booksRoutes = require('./routes/books');
//константы для подключения БД
const keys = require('./config/keys');


const app = express();


/**
 * Middleware
 */
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())


/**
 * Routes
 */
app.use('/api/auth', authRoutes);
app.use('/api/authors', authorsRoutes);
app.use('/api/books', booksRoutes);


/**
 * Init passport.js
 */
app.use(passport.initialize());
require('./middleware/passport')(passport)



/**
 * Connect to DataStore
 */
mongoose.connect(keys.MONGO_URL, {useNewUrlParser: true})
    .then( () => {
        console.log('Successfully connected to MongoDB');
        
    })
    .catch( err => console.log(err))



module.exports = app;