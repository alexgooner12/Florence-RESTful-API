const Issue = require('../models/Issue');
const issueValidator = require('../validation');
const { getEditIssueAction, getLoadIssueAction } = require('../helpers');

exports.loadIssues = async (req, res) => {
    try {
        const issueList = await Issue.find();
        res.send({ issueList });
    } catch (error) {
        res.send({ error });
    }
}

exports.loadIssue = async (req, res) => {
    try {
        const issue = await getLoadIssueAction(req);
        res.send({ issue });
    } catch (error) {
        res.send({ error });
    }
}

exports.deleteIssue = async (req, res) => {
    if (!req.params.id) return res.status(400).send({ error: 'ID has not been provided' });

    try {
        const issue = await Issue.deleteOne({ _id: req.params.id });
        res.send({ issue });
    } catch (error) {
        res.send({ error });
    }
}

exports.createIssue = async (req, res) => {
    const { error } = issueValidator(req.body);
    if (error) return res.status(400).send({ error: error.details });

    try {
        const newIssue = new Issue({ title: req.body.title });
        const issue = await newIssue.save();
        res.send({ issue });
    } catch (error) {
        res.send({ error });
    }
}

exports.editIssue = async (req, res) => {
    if (!req.params.id) return res.status(400).send({ error: 'ID has not been provided' });
    const { method, payload } = getEditIssueAction(req);

    try {
        const issue = await Issue.updateOne({ _id: req.params.id }, {
            [method]: payload
        });
        res.send({ issue });
    } catch (error) {
        res.send({ error });
    }
}
