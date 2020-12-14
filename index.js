const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 4000;
const uri = process.env.ATLAS_URI;

app.use(express.json());
app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyparser.urlencoded({extended: true}));
app.use('/scripts', express.static(path.join(__dirname, './node_modules')));

const issuesRoute = require('./routes/issues');
const imagesRoute = require('./routes/images');
app.use('/issues', issuesRoute);
app.use('/images', imagesRoute);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

mongoose.connection.once('open', () => console.log("Connected to DB"));

app.listen(port, () => console.log('running'));
