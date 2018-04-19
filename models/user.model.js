const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const emailLengthChecker = (email) => {
  if (!email) {
    return false;
  }
  if (email.length < 5 || email.length > 30) {
    return false;
  }
  return true;
};

const validEmailChecker = (email) => {
  if (!email) {
    return false;
  }
  const regExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return regExp.test(email);
};

const usernameLengthChecker = (username) => {
  if (!username) {
    return false;
  }
  if (username.length < 3 || username.length > 15) {
    return false;
  }
  return true;
};

const validUsername = (username) => {
  if (!username) {
    return false;
  }
  const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
  return regExp.test(username);
};

const passwordLengthChecker = (password) => {
  if (!password) {
    return false;
  }
  if (password.length < 8 || password.length > 30) {
    return false;
  }
  return true;
};

const validPassword = (password) => {
  if (!password) {
    return false;
  }
  const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
  return regExp.test(password);
};

const emailValidators = [
  {
    validator: emailLengthChecker, message: 'Az email hosszúsága minimum 5, maximum 30 karakter hosszú lehet.',
  },
  {
    validator: validEmailChecker, message: 'Érvényes email címet adjon meg!',
  },
];

const usernameValidators = [
  {
    validator: usernameLengthChecker, message: 'Az felhasználónév hosszúsága minimum 3, maximum 15 karakter hosszú lehet.',
  },
  {
    validator: validUsername, message: 'A felhasználónév nem tartalmazhat speciális karaktereket.',
  },
];

const passwordValidators = [
  {
    validator: passwordLengthChecker, message: 'A jelszó hosszúsága minimum 8, maximum 30 karakter hosszú lehet.',
  },
  {
    validator: validPassword, message: 'A jelszónak tartalmaznia kell legalább egy kisbetűt, nagybetűt, speciális karaktert és számot.',
  },
];

const userSchema = new mongoose.Schema({
  email: {
    type: String, required: true, unique: true, lowercase: true, validate: emailValidators,
  },
  username: {
    type: String, required: true, unique: true, lowercase: true, validate: usernameValidators,
  },
  password: { type: String, required: true, validate: passwordValidators },
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) { return next(); }

  bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    return next();
  });
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
