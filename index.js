const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || 4000;
const uri = process.env.NODE_ENV !== 'test' ? process.env.ATLAS_URI : process.env.ATLAS_TEST_URI;

app.use(express.json());

const issuesRoute = require('./routes/issues');
app.use('/issues', issuesRoute);

mongoose.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useFindAndModify: false,
    useCreateIndex: true
});

mongoose.connection.once('open', () => console.log("Connected to DB"));

app.listen(port, () => console.log('running'));

module.exports = app;
