const mongoose = require('mongoose');

const IssueSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        trim: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    isPending: {
        type: Boolean,
        default: false
    },
    files: {
        type: Array, 
    },
    comments: {
        type: Array, 
    }
});

module.exports = mongoose.model('Issue', IssueSchema);
