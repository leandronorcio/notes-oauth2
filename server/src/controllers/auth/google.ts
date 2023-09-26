import { RequestHandler } from 'express';
import { generateCsrfToken } from '../../utils/generateToken';
import { getGoogleAccessAndIdToken } from '../../services/auth/google';

/**
 * Google supports OpenID Connect, this means we won't need to call
 * their user's info endpoint as an `id_token` that contains the user info
 * will be included in the response when we exchange the authorization code
 * for an access token.
 *
 * Docs: https://developers.google.com/identity/openid-connect/openid-connect
 */
export const googleAuth: RequestHandler = (req, res) => {
  // We'll send the user to Google's authorization endpoint
  const authEndpoint = new URL('https://accounts.google.com/o/oauth2/v2/auth');

  // Generate a CSRF token, this will be sent back to the callback url after successful authorization
  const csrfToken = generateCsrfToken();
  req.session.state = csrfToken;

  // Build the URL parameters
  const params: Record<string, string> = {
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    // Note that we're not using the `id_token` response type, because it's more secure to get the ID token via the back channel
    // If `id_token` is in the scope, the ID token will be sent via the URL query params, we want to avoid that
    response_type: 'code',
    scope: 'openid email profile',
    redirect_uri: process.env.GOOGLE_REDIRECT_URI as string,
    state: csrfToken,
  };
  for (const key in params) authEndpoint.searchParams.set(key, params[key]);

  res.redirect(authEndpoint.toString());
};

export const googleAuthCallback: RequestHandler = async (req, res) => {
  // Github will send us the `code` and `state` query params upon successful authorization
  // The `verifyCsrfToken()` middleware verifies if the `state` is valid
  try {
    const user = await getGoogleAccessAndIdToken(req.query.code as string);
    res.send(user);
  } catch (error) {
    res.sendStatus(500);
  }
};
