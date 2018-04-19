const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/database');
const path = require('path');

const router = express.Router();
const auth = require('./routes/auth.route')(router);
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

mongoose.connect(db.uri).then(
  () => {
    console.log(`MongoDB connected: ${db.db}`);
  },
  (err) => {
    console.error(`MongoDB error: ${err}`);
  },
);

app.use(cors({
  origin: 'http://localhost:4200',
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/poker-blog/dist/`));
app.use('/auth', auth);

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/poker-blog/dist/index.html`));
});

app.listen(3500, () => {
  console.log('Listening on port 3500');
});
