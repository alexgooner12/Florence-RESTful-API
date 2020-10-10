const router = require('express').Router();
const Issue = require('../models/Issue');

router.get('/', async (req, res) => {
    try {
        const issueList = await Issue.find();
        res.send({ issueList });
    } catch (error) {
        res.send({ error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);
        res.send({ issue });
    } catch (error) {
        res.send({ error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const issue = await Issue.deleteOne({ _id: req.params.id });
        res.send({ issue });
    } catch (error) {
        res.send({ error });
    }
});

router.post('/', async (req, res) => {
    const issue = new Issue({ title: req.body.title });
    try {
        const savedIssue = await issue.save();
        res.send({ savedIssue });
    } catch (error) {
        res.send({ error });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedIssue = await Issue.updateOne({ _id: req.params.id }, { 
            $set: { title: req.body.title } 
        });
        res.send({ updatedIssue });
    } catch (error) {
        res.send({ error });
    }
});


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

router.get('/:id/comments/', async (req, res) => {
    try {
        const issueComments = await Issue.findById(req.params.id).select('comments');
        res.send({ issueComments });
    } catch (error) {
        res.send({ error });
    }
});

router.post('/:id/comments/', async (req, res) => {
    try {
        const issueComments = await Issue.updateOne({ _id: req.params.id }, { 
            $addToSet: { comments: req.body.comment } 
        });
        res.send({ issueComments });
    } catch (error) {
        res.send({ error });
    }
});

module.exports = router;