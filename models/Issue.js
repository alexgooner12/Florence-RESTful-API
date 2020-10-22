const mongoose = require('mongoose');
const { statusValues } = require('../constants');

const IssueSchema = mongoose.Schema({
    title: {
        type: String,
        uniq: true,
        trim: true
    },
    status: {
        type: String,
        default: statusValues.INCOMPLETE
    },
    files: {
        type: Array
    },
    comments: {
        type: Array
    }
});

module.exports = mongoose.model('Issue', IssueSchema);

