const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

module.exports = (router) => {
  router.post('/register', (req, res) => {
    if (!req.body.email) {
      res.json({ success: false, message: 'Add meg az email címed!' });
    } else if (!req.body.username) {
      res.json({ success: false, message: 'Add meg a felhasználó neved!' });
    } else if (!req.body.password) {
      res.json({ success: false, message: 'Add meg a jelszavad!' });
    } else {
      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });
      user.save((err) => {
        if (err) {
          if (err.code === 11000) {
            res.json({ success: false, message: 'A felhasználónév vagy az email már létezik.' });
          } else if (err.errors) {
            if (err.errors.email) {
              res.json({ success: false, message: err.errors.email.message });
            } else if (err.errors.username) {
              res.json({ success: false, message: err.errors.username.message });
            } else if (err.errors.password) {
              res.json({ success: false, message: err.errors.password.message });
            } else {
              res.json({ success: false, message: err });
            }
          } else {
            res.json({ success: false, message: 'A felhasználót nem mentettük. Hiba: ', err });
          }
        } else {
          res.json({ success: true, message: 'A felhasználót regisztráltuk. Lépjen be!' });
        }
      });
    }
  });

  router.post('/login', (req, res) => {
    if (!req.body.username) {
      res.json({ success: false, message: 'Nem adott meg felhasználónevet.' });
    } else if (!req.body.password) {
      res.json({ success: false, message: 'Nem adott meg jelszót.' });
    } else {
      User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
          res.json({ success: false, message: err });
        } else if (!user) {
          res.json({ success: false, message: 'A felhasználónév nem található. ' });
        } else {
          const validPassword = user.comparePassword(req.body.password);
          if (!validPassword) {
            res.json({ success: false, message: 'Helytelen jelszó.' });
          } else {
            const token = jwt.sign({ userId: user.id }, db.secret, { expiresIn: '24h' });
            res.json({
              success: true, message: 'Belépve!', token, user: { username: user.username },
            });
          }
        }
      });
    }
  });

  router.use((req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      res.json({ success: false, message: 'Nincs megadott token.' });
    } else {
      jwt.verify(token, db.secret, (err, decoded) => {
        if (err) {
          res.json({ success: false, message: `Helytelen token.${err}` });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  });

  router.get('/profil', (req, res) => {
    User.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) => {
      if (err) {
        res.json({ success: false, message: err });
      } else if (!user) {
        res.json({ success: false, message: 'User nem található.' });
      } else {
        res.json({ success: true, user });
      }
    });
  });

  return router;
};
