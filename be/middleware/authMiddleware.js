const jwt = require('jsonwebtoken');
const SECRET = 'f9D7#kLp2@xZ8!qR4vM1$wT6%eY0&uB3';

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
