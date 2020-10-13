const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const issuesRoute = require('./routes/issues');
const filesRoute = require('./routes/files');

const port = process.env.PORT || 4000;
const uri = process.env.ATLAS_URI;

app.use(express.json());
app.use('/issues', issuesRoute);
app.use('/files', filesRoute);


mongoose.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useFindAndModify: false,
    useCreateIndex: true
});

mongoose.connection.once('open', () => console.log("Connected to DB"));

app.listen(port, () => console.log('running'));
