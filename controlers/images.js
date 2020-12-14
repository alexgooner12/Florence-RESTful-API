const MongoClient = require('mongodb');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
require('dotenv').config();

const url = process.env.ATLAS_URI;

let storage = new GridFsStorage({
  url,
  file: (req, file) => {
    return {
      bucketName: 'images',
      filename: file.originalname
    }
  }
});

let upload = null;

storage.on('connection', (db) => {
  upload = multer({ storage }).single('file1');
});

module.exports.loadHome = (req, res) => {
  res.render('index', {title: 'Express App', message: 'Express Boilerplate set up!'});
};

module.exports.uploadFile = (req, res) => {

  upload(req, res, (err) => {
    if(err){
      return res.render('index', {title: 'Uploaded Error', message: 'File could not be uploaded', error: err});
    }
    res.render('index', {title: 'Uploaded', message: `File ${req.file.filename} has been uploaded!`});
  });
};

module.exports.getFile = async (req, res) => {
  let fileName = req.body.text1;
  MongoClient.connect(url, function(err, client){

    if(err){
      return res.render('index', {title: 'Uploaded Error', message: 'MongoClient Connection error', error: err.errMsg});
    }
    const db = client.db('intern-test');

    const collection = db.collection('images.files');
    const collectionChunks = db.collection('images.chunks');

    collection.find({filename: fileName}).toArray(function(err, docs){
      if(err){
        return res.render('index', {title: 'File error', message: 'Error finding file', error: err.errMsg});
      }
      if(!docs || docs.length === 0){
        return res.render('index', {title: 'Download Error', message: 'No file found'});
      }
      collectionChunks.find({files_id : docs[0]._id}).sort({n: 1}).toArray(function(err, chunks){
        if(err){
          return res.render('index', {title: 'Download Error', message: 'Error retrieving chunks', error: err.errmsg});
        }
        if(!chunks || chunks.length === 0){
          return res.render('index', {title: 'Download Error', message: 'No data found'});
        }
        let fileData = [];
        for(let i=0; i<chunks.length;i++){
          fileData.push(chunks[i].data.toString('base64'));
        }
        let finalFile = 'data:' + docs[0].contentType + ';base64,' + fileData.join('');
        res.render('imageView', {title: 'Image File', message: 'Image loaded from MongoDB GridFS', imgurl: finalFile});
      });
    });
  });
};