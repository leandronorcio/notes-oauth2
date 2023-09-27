import { RequestHandler } from 'express';

export const logout: RequestHandler = (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    return res.sendStatus(401);
  }

  // NOTE: Specify the `path` of the cookie to clear it.
  res.clearCookie('refreshToken', { httpOnly: true, path: '/auth/refresh' });
  res.sendStatus(200);
};
