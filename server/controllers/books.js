const Book = require('../models/Book');
const errorHandler = require('../utils/errorHandler');

module.exports.getBooks = function(req,res) {
    res.status(200).json({
        getBooks: 'getBooksList'
    })
}

module.exports.getBookById = function(req,res) {

}
module.exports.createBook = async function(req,res) {
    const book = new Book({
        name: req.body.name,
        publishing: req.body.publishing,
        ebook: req.body.ebook,
        year: req.body.year,
        isbn: req.body.isbn,
        pages: req.body.pages,
        user: req.user.id
    });

    try {
        await book.save();
        res.status(201).json(book)

    } catch(e) {
        errorHandler(res, e);
    }
}
module.exports.updateBook = function(req,res) {

}
module.exports.removeBook = function(req,res) {

}