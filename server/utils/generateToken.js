const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'super_secret_aura_fintech_jwt_key_2026', {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
