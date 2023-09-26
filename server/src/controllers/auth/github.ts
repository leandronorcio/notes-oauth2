import { RequestHandler } from 'express';
import { generateCsrfToken } from '../../utils/generateToken';

// Github's OAuth 2.0 docs: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
export const githubAuth: RequestHandler = (req, res) => {
  // This is where we'll send the user to authorize our app
  const authEndpoint = new URL('https://github.com/login/oauth/authorize');

  // Generate a CSRF token, this will be sent back to the callback url after successful authorization
  const csrfToken = generateCsrfToken();
  req.session.state = csrfToken;

  // Build the URL parameters
  const params: Record<string, string> = {
    client_id: process.env.GITHUB_CLIENT_ID as string,
    redirect_uri: process.env.GITHUB_REDIRECT_URI as string,
    scope: 'read:user user:email',
    state: csrfToken,
  };
  for (const key in params) authEndpoint.searchParams.set(key, params[key]);

  res.redirect(authEndpoint.toString());
};
