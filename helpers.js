const Issue = require('./models/Issue');

const editIssueHandler = {
    addToSet: '$addToSet',
    set: '$set',
    comments: 'comments',
    files: 'files',

    hasCommentOrFile(req) {
        return req.body.comment || req.file;  
    },

    getEditIssueMethod(req) {
        return this.hasCommentOrFile(req) ? this.addToSet : this.set;
    },
    
    getEditIssuePayload(req) {
        return this.hasCommentOrFile(req) ? Object.assign({}, { 
            [req.body.comment ? this.comments : this.files]: req.body.comment || req.file }) 
            : req.body;
    }
}

exports.getEditIssueAction = req => {
    return Object.assign({}, { 
        method: editIssueHandler.getEditIssueMethod(req), 
        payload: editIssueHandler.getEditIssuePayload(req) 
    })
}

exports.getLoadIssueAction = req => {
    if ('comments' in req.query) return Issue.findById(req.params.id).select('comments');
    else if ('files' in req.query) return Issue.findById(req.params.id).select('files');
    return Issue.findById(req.params.id);
}