const User = require('../models/user.model');
const Blog = require('../models/blog.model');

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

  router.get('/allBlogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
      if (err) {
        res.json({ success: false, message: err });
      } else if (!blogs) {
        res.json({ success: false, message: 'Nem található bejegyzés.' });
      } else {
        res.json({ success: true, blogs });
      }
    }).sort({ _id: -1 });
  });

  router.get('/blogPost/:id', (req, res) => {
    if (!req.params.id) {
      res.json({ success: false, message: 'Nincs megadott ID.' });
    } else {
      Blog.findOne({ _id: req.params.id }, (err, blog) => {
        if (err) {
          res.json({ success: false, message: 'Nincs ilyen ID-jú bejegyzés.' });
        } else if (!blog) {
          res.json({ success: false, message: 'Nem található bejegyzés.' });
        } else {
          User.findOne({ _id: req.decoded.userId }, (err, user) => {
            if (err) {
              res.json({ success: false, message: err });
            } else if (!user) {
              res.json({ success: false, message: 'A felhasználót nem lehet azonosítani.' });
            } else if (user.username !== blog.createdBy) {
              res.json({ success: false, message: 'Nincs felhatalmazása a bejegyzés szerkesztéséhez.' });
            } else {
              res.json({ success: true, blog });
            }
          });
        }
      });
    }
  });

  router.put('/updateBlog', (req, res) => {
    if (!req.body._id) {
      res.json({ success: false, message: 'Nincs megadott ID.' });
    } else {
      Blog.findOne({ _id: req.body._id }, (err, blog) => {
        if (err) {
          res.json({ success: false, message: 'Nincs ilyen ID-jú bejegyzés.' });
        } else if (!blog) {
          res.json({ success: false, message: 'Nem található bejegyzés.' });
        } else {
          User.findOne({ _id: req.decoded.userId }, (err, user) => {
            if (err) {
              res.json({ success: false, message: err });
            } else if (!user) {
              res.json({ success: false, message: 'A felhasználót nem lehet azonosítani.' });
            } else if (user.username !== blog.createdBy) {
              res.json({ success: false, message: 'Nincs felhatalmazása a bejegyzés szerkesztéséhez.' });
            } else {
              blog.title = req.body.title;
              blog.body = req.body.body;
              blog.save((err) => {
                if (err) {
                  res.json({ success: false, message: err });
                } else {
                  res.json({ success: true, message: 'Bejegyzés frissítve.' });
                }
              });
            }
          });
        }
      });
    }
  });

  router.delete('/deleteBlog/:id', (req, res) => {
    if (!req.params.id) {
      res.json({ success: false, message: 'Nincs megadott ID.' });
    } else {
      Blog.findOne({ _id: req.params.id }, (err, blog) => {
        if (err) {
          res.json({ success: false, message: 'Nincs ilyen ID-jú bejegyzés.' });
        } else if (!blog) {
          res.json({ success: false, message: 'Nem található bejegyzés.' });
        } else {
          User.findOne({ _id: req.decoded.userId }, (err, user) => {
            if (err) {
              res.json({ success: false, message: err });
            } else if (!user) {
              res.json({ success: false, message: 'A felhasználót nem lehet azonosítani.' });
            } else if (user.username !== blog.createdBy) {
              res.json({ success: false, message: 'Nincs felhatalmazása a bejegyzés törléséhez.' });
            } else {
              blog.remove((err) => {
                if (err) {
                  res.json({ success: false, message: err });
                } else {
                  res.json({ success: true, message: 'Bejegyzés törölve.' });
                }
              });
            }
          });
        }
      });
    }
  });

  router.post('/comment', (req, res) => {
    if (!req.body.comment) {
      res.json({ success: false, message: 'Nincs megadott komment.' });
    } else if (!req.body.id) {
      res.json({ success: false, message: 'Nincs megadott ID.' });
    } else {
      Blog.findOne({ _id: req.body.id }, (err, blog) => {
        if (err) {
          res.json({ success: false, message: 'Nincs ilyen ID-jú bejegyzés.' });
        } else if (!blog) {
          res.json({ success: false, message: 'Nem található bejegyzés.' });
        } else {
          User.findOne({ _id: req.decoded.userId }, (err, user) => {
            if (err) {
              res.json({ success: false, message: 'Hiba' });
            } else if (!user) {
              res.json({ success: false, message: 'A felhasználót nem lehet azonosítani.' });
            } else {
              blog.Comment.push({
                comment: req.body.comment,
                commentator: user.username,
              });
              blog.save((err) => {
                if (err) {
                  res.json({ success: false, message: 'Hiba' });
                  res.json({ success: true, message: 'Komment mentve.' });
                }
              });
            }
          });
        }
      });
    }
  });


  return router;
};
