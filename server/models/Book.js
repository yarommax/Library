const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        ref: 'authors',
        type: Schema.Types.ObjectId
    },
    publishing: {
        type: String,
        default: ''
    },
    ebook: {
        type: Boolean,
        default: ''
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
    }
});

module.exports = mongoose.model('book', bookSchema);