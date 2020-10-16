const router = require('express').Router();
const { loadIssues, loadIssue, deleteIssue, createIssue, editIssue } = require('../controlers/issues');

router.route('/').get(loadIssues).post(createIssue);
router.route('/:id').get(loadIssue).patch(editIssue).delete(deleteIssue);

module.exports = router;
