const Book = require('../models/Book');
const errorHandler = require('../utils/errorHandler');

module.exports.getBooks = async function(req,res) {
    try {
        //Найти все книги , созданные залогиненным юзером.
        const books = await Book.find({user: req.user.id});
        //ответить обратно клиенту статусом и массивом авторов:
        res.status(200).json(books);

    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.getBookById = async function(req,res) {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json(book);

    } catch(e) {
        errorHandler(res, e);
    }
}
module.exports.createBook = async function(req,res) {
    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        publishing: req.body.publishing,
        ebook: req.body.ebook,
        year: req.body.year,
        isbn: req.body.isbn,
        pages: req.body.pages,
        user: req.user.id
    });
    console.log(book);
    try {
        await book.save();
        res.status(201).json(book)

    } catch(e) {
        errorHandler(res, e);
    }
}
module.exports.updateBook = async function(req,res) {
    const updated = {
        name: req.body.name,
        author: req.body.author,
        publishing: req.body.publishing,
        ebook: req.body.ebook,
        year: req.body.year,
        isbn: req.body.isbn,
        pages: req.body.pages,
        user: req.user.id
    }
    try {
        const book = await Book.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        res.status(200).json(book)

    } catch(e) {
        errorHandler(res, e);
    }
}
module.exports.removeBook = async function(req,res) {
    try {
        //Удаления книги по id 
        await Book.remove({_id: req.params.id});

        res.status(200).json({
            message: "Book deleted."
        });

    } catch(e) {
        errorHandler(res, e);
    }
}