const crypto = require('crypto').randomBytes(256).toString('hex');

// Export config objektum
module.exports = {
  uri: 'mongodb://localhost:27017/poker-blog',
  secret: crypto,
  db: 'poker-blog',
};
