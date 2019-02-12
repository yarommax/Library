const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const authorsRoutes = require('./routes/authors');
const booksRoutes = require('./routes/books');
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



module.exports = app;