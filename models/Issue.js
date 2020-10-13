const mongoose = require('mongoose');

const IssueSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean, 
        default: false,
        required: true
    },
    isPending: {
        type: Boolean, 
        default: false,
        required: true
    },
    files: {
        type: Array, 
        default: [],
        required: true
    },
    comments: {
        type: Array, 
        default: [],
        required: true
    }
});

module.exports = mongoose.model('Issue', IssueSchema);
