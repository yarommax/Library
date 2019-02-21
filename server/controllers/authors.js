const Author = require('../models/Author');
const errorHandler = require('../utils/errorHandler');

//async - для асинхронного кода

module.exports.getAuthors = async function(req, res) {
    try {
        //Найти всех авторов , созданных залогиненным юзером.
        const authors = await Author.find({user: req.user.id});
        //ответить обратно клиенту статусом и массивом авторов:
        res.status(200).json(authors);

    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.getAuthorById = async function(req,res) {
    try {
        //http://localhost:5000/authors/:id
        //Поиск в бд определенного автора по айди из params
        const author = await Author.findById(req.params.id);
        res.status(200).json(author);

    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.createAuthor = async function(req,res) {
    
    const author = new Author({
        email: req.body.email,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        /* books: req.body.books, */
        birthDate: Date.now(),
        user: req.user.id
    });

    try {
        await author.save();
        res.status(201).json(author)

    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.updateAuthor = async function(req,res) {
    const updated = {
        email: req.body.email,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        birthDate: Date.now(),
        user: req.user.id
    }

    try {
        const author = await Author.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        res.status(200).json(author)

    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.removeAuthor = async function(req,res) {
    try {
        //Удаления автора по id 
        await Author.remove({_id: req.params.id});

        res.status(200).json({
            message: "Author deleted."
        });

    } catch(e) {
        errorHandler(res, e);
    }
}