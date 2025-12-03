const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
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
    image: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    }
})

module.exports = mongoose.Model('Course', courseSchema)