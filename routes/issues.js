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
    try {
        const newIssue = new Issue(req.body);
        const issue = await newIssue.save();
        res.send({ issue });
    } catch (error) {
        res.send({ error });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const issue = await Issue.updateOne({ _id: req.params.id }, {
            $set: req.body
        });
        res.send({ issue });
    } catch (error) {
        res.send({ error });
    }
});

module.exports = router;
