const mongoose = require('mongoose');
const {Schema} = mongoose;

const cardSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userFirstName: {
        type: String,
        required: true
    },
    userLastName: {
        type: String,
        required: false
    },
    postImage: {
        type: String,
        required: false
    },
    caption: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
