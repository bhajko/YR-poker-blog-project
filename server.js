const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/database');
const path = require('path');

const app = express();

// mongoose.Promise = global.Promise;
mongoose.connect(db.uri).then(
    () => {
        console.log('MongoDB connected: ' + db.db)
    },
    err => {
        console.error('MongoDB error: ' + err)
    }
);

app.use(express.static(__dirname + '/poker-blog/dist/'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/poker-blog/dist/index.html'));
});

app.listen(3500, () => {
    console.log('Listening on port 3500');
});