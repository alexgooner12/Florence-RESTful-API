const Issue = require('../models/Issue');
const issueValidator = require('../validation');

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
        const issue = await Issue.findById(req.params.id);
        res.send({ issue });
    } catch (error) {
        res.send({ error });
    }
}

exports.deleteIssue = async (req, res) => {
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

    const issue = new Issue({ title: req.body.title });

    try {
        const savedIssue = await issue.save();
        res.send({ savedIssue });
    } catch (error) {
        res.send({ error });
    }
}

exports.editIssue = async (req, res) => {
    try {
        const updatedIssue = await Issue.updateOne({ _id: req.params.id }, { 
            $set: { title: req.body.title } 
        });
        res.send({ updatedIssue });
    } catch (error) {
        res.send({ error });
    }
}
