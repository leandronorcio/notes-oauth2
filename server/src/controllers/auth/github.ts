import { RequestHandler } from 'express';
import crypto from 'crypto';
import {
  getGithubAccessToken,
  getGithubUser,
} from '../../services/auth/github';

// Github's OAuth docs: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
export const githubAuth: RequestHandler = (req, res) => {
  // This is where we'll send the user to authorize our app
  const authEndpoint = new URL('https://github.com/login/oauth/authorize');

  // Generate a CSRF token, this will be sent back to the callback url after successful authorization
  const csrfToken = crypto.randomBytes(16).toString('hex');
  req.session.state = csrfToken;
  console.log(csrfToken);

  // Build the URL parameters
  const params: Record<string, string> = {
    client_id: process.env.GITHUB_CLIENT_ID as string,
    redirect_uri: 'http://localhost:4000/auth/github/callback',
    scope: 'read:user user:email',
    state: csrfToken,
  };
  for (const key in params) authEndpoint.searchParams.set(key, params[key]);

  res.redirect(authEndpoint.toString());
};

export const githubAuthCallback: RequestHandler = async (req, res) => {
  // Github will send us the `code` and `state` query params upon successful authorization
  const { code, state } = req.query;
  if (!code || !state) return res.sendStatus(401);

  // Verify if the `state` matches our `csrfToken, if they don't, it means an attacker created the request
  if (state !== req.session.state) return res.sendStatus(401);

  try {
    // Exchange the authorization code for an access token
    const { access_token } = await getGithubAccessToken(code as string);
    const user = await getGithubUser(access_token);

    res.send(user);
  } catch (error) {
    res.sendStatus(500);
  }
};
