import { RequestHandler } from 'express';

export const refresh: RequestHandler = (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    return res.sendStatus(401);
  }

  res.send({ refreshToken: token });
};
