const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    profession: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["learner", "creator", "admin"],
        default: "learner"
    },
    fav: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }],
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }],
    learn: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }]
})

module.exports = mongoose.model('User', UserSchema);