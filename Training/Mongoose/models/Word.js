const mongoose = require('mongoose');
const wordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true
    },
    description: {
        language: {
            type: String,
        },
        text: {
            type: String,
            required: true
        },
        obscurity: {
            type: Number,
            default: 1,
        }
    },
    category: {
        type: [String]
    }
})

const Word = mongoose.model('Word', wordSchema)

module.exports = Word
