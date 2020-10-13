const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), (req, res) => {
    res.send({ msg: 'File uploaded' });
 });

 module.exports = router;
