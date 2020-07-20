import * as jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(403);

  const token = authHeader.split(' ')[1];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.error(err);
    if (err) return res.status(401).json('Invalid credentials.');
    req.user = user;
    next();
  });
}
