const mongoose = require('mongoose');

const IssueSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'empty'
    },
    files: {
        type: Array, 
        default: []
    },
    comments: {
        type: Array, 
        default: []
    }
});

module.exports = mongoose.model('Issue', IssueSchema);