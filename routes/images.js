const { uploadFile, loadHome, getFile } = require('../controlers/images');
const router = require('express').Router();


router.route('/').get(loadHome);
router.route('/upload').post(uploadFile);
router.route('/getFile').post(getFile);
module.exports = router;
