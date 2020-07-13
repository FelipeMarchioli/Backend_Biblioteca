const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    publication_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Book', BookSchema);