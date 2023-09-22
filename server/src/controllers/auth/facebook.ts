import { RequestHandler } from 'express';
import {
  generateCsrfToken,
  generatePkceTokens,
  generateRandomToken,
} from '../../utils/generateToken';
import { getFacebookAccessAndIdToken } from '../../services/auth/facebook';

/**
 * Facebook supports OpenID Connect, this means we won't need to call
 * their user's info endpoint as an `id_token` that contains the user info
 * will be included in the response when we exchange the authorization code
 * for an access token.
 *
 * Docs: https://developers.facebook.com/docs/facebook-login/guides/advanced/oidc-token
 */
export const facebookbAuth: RequestHandler = (req, res) => {
  const authEndpoint = new URL('https://www.facebook.com/v11.0/dialog/oauth');

  // Generate a CSRF token, this will be sent back to the callback url after successful authorization
  const csrfToken = generateCsrfToken();
  req.session.state = csrfToken;

  // Facebook also requires the PKCE protocol, we'll use the `codeVerifier` later
  // when we exchange the authorization code for an access and id token
  const { codeVerifier, codeChallenge } = generatePkceTokens();
  req.session.codeVerifier = codeVerifier;

  // And a`nonce` value for verifying the `id_token` later
  const nonce = generateRandomToken(8);
  req.session.nonce = nonce;

  // Construct the required URL parameters
  const params: Record<string, string> = {
    client_id: process.env.FACEBOOK_CLIENT_ID as string,
    // Note that we're not using the `id_token` response type, because it's more secure to get the ID token via the back channel
    // If `id_token` is in the scope, the ID token will be sent via the URL query params, we want to avoid that
    scope: 'openid email public_profile',
    response_type: 'code',
    redirect_uri: 'http://localhost:4000/auth/facebook/callback',
    state: csrfToken,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    nonce,
  };
  for (const key in params) authEndpoint.searchParams.set(key, params[key]);

  res.redirect(authEndpoint.toString());
};

export const facebookbAuthCallback: RequestHandler = async (req, res) => {
  // Facebook will send us the `code` and `state` query params upon successful authorization
  // The `verifyCsrfToken()` middleware verifies if the `state` is valid

  try {
    const user = await getFacebookAccessAndIdToken(
      req.query.code as string,
      req.session.codeVerifier as string,
      req.session.nonce as string
    );

    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
