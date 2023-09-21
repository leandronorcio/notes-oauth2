import { RequestHandler } from 'express';

export const verifyCsrfToken: RequestHandler = (req, res, next) => {
  // Github will send us the `code` and `state` query params upon successful authorization
  const { code, state } = req.query;
  if (!code || !state) return res.sendStatus(401);

  // Verify if the `state` matches our `csrfToken, if they don't, it means an attacker created the request
  if (state !== req.session.state) return res.sendStatus(401);

  // Proceed if the `state` is valid, and there is an authorization code
  next();
};
