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
        type: Buffer,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    video: {
        type: Buffer,
        require: true
    },
    rating: {
        total: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
        average: { type: Number, default: 0 },
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    }
})

module.exports = mongoose.model('Course', courseSchema)