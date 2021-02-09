const jwt = require('jsonwebtoken');

const { SECRET_TOKEN } = process.env;

module.exports = {
  createToken: (payload) => jwt.sign(payload, SECRET_TOKEN, {
    expiresIn: 60 * 60 * 24 * 5,
  }),
  decodeToken: (token) => jwt.verify(token, SECRET_TOKEN),
  isTokenValid: (token) => jwt.verify(token, SECRET_TOKEN, (error, decoded) => !error && decoded),
};
