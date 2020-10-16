const mongoose = require('mongoose');

const IssueSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        trim: true
    },
    status: {
        type: String
    },
    files: {
        type: Array, 
    },
    comments: {
        type: Array, 
    }
});

module.exports = mongoose.model('Issue', IssueSchema);
