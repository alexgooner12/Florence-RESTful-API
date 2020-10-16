const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const issuesRoute = require('./routes/issues');

const port = process.env.PORT || 4000;
const uri = process.env.ATLAS_URI;

app.use(express.json());
app.use('/issues', issuesRoute);

mongoose.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useFindAndModify: false,
    useCreateIndex: true
});

mongoose.connection.once('open', () => console.log("Connected to DB"));

let gfs;
mongoose.connection.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads"
  });
  console.log('Grif connceted');
});

app.listen(port, () => console.log('running'));
