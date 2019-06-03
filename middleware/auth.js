const jwt = require('jsonwebtoken');
const config = require('config');

const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send({ message: 'No token. Authorization denied.'});
  }
  
  try {
    // Change the value of the jwtSecret in the config file in the config folder
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(401).send({ message: 'Invalid token.' });
  }
};

module.exports = auth;