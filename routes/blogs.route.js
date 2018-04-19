const User = require('../models/user.model');
const Blog = require('../models/blog.model');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

module.exports = (router) => {
  router.post('/newBlog', (req, res) => {
    if (!req.body.title) {
      res.json({ success: false, message: 'A blog cím szükséges!' });
    } else if (!req.body.body) {
      res.json({ success: false, message: 'A blog tartalom szükséges!' });
    } else if (!req.body.createdBy) {
      res.json({ success: false, message: 'A blog készítő szükséges!' });
    } else {
      const blog = new Blog({
        title: req.body.title,
        body: req.body.body,
        createdBy: req.body.createdBy,
      });
      blog.save((err) => {
        if (err) {
          if (err.errors) {
            if (err.errors.title) {
              res.json({ success: false, message: err.errors.title.message });
            } else if (err.errors.body) {
              res.json({ success: false, message: err.errors.body.message });
            } else {
              res.json({ success: false, message: err.err });
            }
          } else {
            res.json({ success: false, message: err });
          }
        } else {
          res.json({ success: true, message: 'Bejegyzés mentve.' });
        }
      });
    }
  });

  return router;
};
