import { RequestHandler } from 'express';

export const refresh: RequestHandler = (req, res) => {
  const token = req.cookies?.refreshToken;
  res.send(`Your refresh token is: ${token}`);
};
