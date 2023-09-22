import { GoogleTokenEndpointResponse, OAuthUser } from '../../types/authTypes';
import { parseJwtPayload } from '../../utils/parseJwtPayload';

/**
 * Since Google supports OpenID Connect, we can directly exchange the
 * authorization code for the ID token, which contains the info of the user
 * thus there won't be a need to make a request to Google's user info endpoint.
 * @param code - The authorization code.
 */
export async function getGoogleAccessAndIdToken(code: string) {
  const tokenEndpoint = 'https://oauth2.googleapis.com/token';
  const body = {
    grant_type: 'authorization_code',
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    code,
    redirect_uri: 'http://localhost:4000/auth/google/callback',
  };

  const res = await fetch(tokenEndpoint, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!res.ok) throw Error('Error getting an access and an ID token.');
  const data = (await res.json()) as GoogleTokenEndpointResponse;
  const { sub, email, email_verified, name, picture } = parseJwtPayload(
    data.id_token
  );

  return {
    id: sub,
    email: email_verified ? email : null,
    name: name,
    avatar: picture,
  } as OAuthUser;
}
