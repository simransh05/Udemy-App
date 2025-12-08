const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    title: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    subCategory: {
        type: String,
        require: true
    },
    thumbnail: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Course', courseSchema)