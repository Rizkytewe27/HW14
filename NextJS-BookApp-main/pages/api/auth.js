import { verify } from 'jsonwebtoken';

export default function authenticateTokenMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const user = verify(token, process.env.JWT_SECRET);
    req.userId = user.userId;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
}
