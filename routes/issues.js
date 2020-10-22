const router = require('express').Router();
const { loadIssues, loadIssue, deleteIssue, createIssue, editIssue } = require('../controlers/issues');
const upload = require('../storage');

router.route('/').get(loadIssues).post(createIssue);
router.route('/:id').get(loadIssue).patch(upload.single('file'), editIssue).delete(deleteIssue);

module.exports = router;
