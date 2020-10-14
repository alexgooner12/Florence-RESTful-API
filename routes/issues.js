const router = require('express').Router();
const Issue = require('../models/Issue');

const getIssues = async (req, res) => {
    try {
        const issueList = await Issue.find();
        res.send({ issueList });
    } catch (error) {
        res.send({ error });
    }
}

const createIssue = async (req, res) => {
    const issue = new Issue({ title: req.body.title });
    try {
        const savedIssue = await issue.save();
        res.send({ savedIssue });
    } catch (error) {
        res.send({ error });
    }
}

const getIssue = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);
        res.send({ issue });
    } catch (error) {
        res.send({ error });
    }
}

const deleteIssue = async (req, res) => {
    try {
        const issue = await Issue.deleteOne({ _id: req.params.id });
        res.send({ issue });
    } catch (error) {
        res.send({ error });
    }
}
const editIssue = async (req, res) => {
    try {
        const updatedIssue = await Issue.updateOne({ _id: req.params.id }, {
            $set: { title: req.body.title }
        });
        res.send({ updatedIssue });
    } catch (error) {
        res.send({ error });
    }
}

router.route('/:id').get(getIssue).delete(deleteIssue).patch(editIssue);

router.route('/').get(getIssues).post(createIssue)

router.patch('/mark_completed/:id', async (req, res) => {
    try {
        const updatedIssue = await Issue.updateOne({ _id: req.params.id }, {
            $set: { isCompleted: req.body.isCompleted, isPending: false }
        });
        res.send({ updatedIssue });
    } catch (error) {
        res.send({ error });
    }
});

router.patch('/mark_pending/:id', async (req, res) => {
    try {
        const updatedIssue = await Issue.updateOne({ _id: req.params.id }, {
            $set: { isPending: req.body.isPending }
        });
        res.send({ updatedIssue });
    } catch (error) {
        res.send({ error });
    }
});

const getComments = async (req, res) => {
    try {
        const issueComments = await Issue.findById(req.params.id).select('comments');
        res.send({ issueComments });
    } catch (error) {
        res.send({ error });
    }
}

const createComment = async (req, res) => {
    try {
        const issueComments = await Issue.updateOne({ _id: req.params.id }, {
            $addToSet: { comments: req.body.comment }
        });
        res.send({ issueComments });
    } catch (error) {
        res.send({ error });
    }
}

router.route('/:id/comments/').get(getComments).post(createComment)

module.exports = router;
