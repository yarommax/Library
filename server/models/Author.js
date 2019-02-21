const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    email: {
        type: String,
        default: ''
    },
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },
    book: [
        {
            type: [String]
        }
    ],
    birthDate: {
        type: Date,
        default: Date.now
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }

});

module.exports = mongoose.model('authors', authorSchema);