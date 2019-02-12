const express = require('express');
const authRoutes = require('./routes/auth');
const authorsRoutes = require('./routes/authors')
const booksRoutes = require('./routes/books')
const app = express();


app.use('/api/auth' , authRoutes);
app.use('/api/authors' , authorsRoutes);
app.use('/api/books' , booksRoutes);



module.exports = app;