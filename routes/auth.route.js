const User = require('../models/user.model');

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
            res.json({ success: false, message: 'A felhasználónév és/vagy az email már létezik.' });
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
          res.json({ success: true, message: 'A felhasználót regisztráltuk!' });
        }
      });
    }
  });

  return router;
};
