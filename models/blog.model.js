const mongoose = require('mongoose');

const titleLengthChecker = (title) => {
  if (!title) {
    return false;
  }
  if (title.length < 5 || title.length > 50) {
    return false;
  }
  return true;
};

const alphaNumericTitleChecker = (title) => {
  if (!title) {
    return false;
  }
  const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
  return regExp.test(title);
};

const bodyLengthChecker = (body) => {
  if (!body) {
    return false;
  }
  if (body.length < 5 || body.length > 500) {
    return false;
  }
  return true;
};

const commentLengthChecker = (comment) => {
  if (!comment[0]) {
    return false;
  }
  if (comment[0].length < 1 || comment[0].length > 200) {
    return false;
  }
  return true;
};

const titleValidators = [
  {
    validator: titleLengthChecker, message: 'A cím minimum 5, maximum 50 karakter hosszú lehet.',
  },
  {
    validator: alphaNumericTitleChecker, message: 'A cím csak betűket és számokat tartalmazhat!',
  },
];

const bodyValidators = [
  {
    validator: bodyLengthChecker, message: 'A tartalom hosszúsága minimum 5, maximum 500 karakter lehet.',
  },
];

const commentValidators = [
  {
    validator: commentLengthChecker, message: 'A komment hosszúsága maximum 200 karakter lehet.',
  },
];

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, validate: titleValidators },
  body: { type: String, required: true, validate: bodyValidators },
  createdBy: { type: String },
  Date: { type: Date, default: Date.now() },
  Comment: [
    {
      comment: { type: String, validate: commentValidators },
      commentator: { type: String },
    },
  ],
});

module.exports = mongoose.model('Blog', blogSchema);
