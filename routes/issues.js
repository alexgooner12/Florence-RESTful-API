const router = require('express').Router();
const { loadIssues, loadIssue, deleteIssue, createIssue, editIssue } = require('../controlers/issues');

router.get('/', loadIssues);
router.get('/:id', loadIssue);
router.post('/', createIssue);
router.patch('/:id', editIssue);
router.delete('/:id', deleteIssue);

module.exports = router;
