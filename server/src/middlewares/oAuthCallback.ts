import { RequestHandler } from 'express';
import { getGithubAccessToken, getGithubUser } from '../services/auth/github';
import { getFacebookAccessAndIdToken } from '../services/auth/facebook';
import { getGoogleAccessAndIdToken } from '../services/auth/google';

// OAuth providers will send us the `code` and `state` query params upon successful
// authorization, the `verifyCsrfToken()` middleware verifies if the `state` is valid
export const oAuthCallback: RequestHandler = async (req, res, next) => {
  const path = req.path;

  try {
    if (path === '/github/callback') {
      const { access_token } = await getGithubAccessToken(
        req.query.code as string
      );
      res.locals.oAuthUser = await getGithubUser(access_token);
    } else if (path === '/google/callback') {
      res.locals.oAuthUser = await getGoogleAccessAndIdToken(
        req.query.code as string
      );
    } else if (path === '/facebook/callback') {
      res.locals.oAuthUser = await getFacebookAccessAndIdToken(
        req.query.code as string,
        req.session.codeVerifier as string,
        req.session.nonce as string
      );
    }

    next();
  } catch (error) {
    res.sendStatus(500);
  }
};
