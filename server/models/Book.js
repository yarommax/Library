const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    /* author: [{
        ref: 'authors',
        type: Schema.Types.ObjectId
        //type: mongoose.Schema.ObjectId
    }], */
    publishing: {
        type: String,
        default: ''
    },
    ebook: {
        type: Boolean,
        default: false
    },
    year: {
        type: Number,
        default: ''
    },
    isbn: {
        type: String,
        default: ''
    },
    pages: {
        type: Number,
        default: ''
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('books', bookSchema);