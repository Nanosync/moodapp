const mongoose = require('mongoose');

const moodSchema = mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    },
    feeling: {
        type: String,
        required: true
    },
    message: String
});

module.exports = mongoose.model('mood', moodSchema);