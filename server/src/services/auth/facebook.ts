import {
  FacebookTokenEndpointResponse,
  OAuthUser,
} from '../../types/authTypes';
import { parseJwtPayload } from '../../utils/parseJwtPayload';

// Exchange the authorization code for an access and an id token
export async function getFacebookAccessAndIdToken(
  code: string,
  codeVerifier: string
) {
  const tokenEndpoint = new URL(
    'https://graph.facebook.com/v11.0/oauth/access_token'
  );

  // We'll send a GET request to Facebook's token endpoint to get the user's access and id token
  const params: Record<string, string> = {
    client_id: process.env.FACEBOOK_CLIENT_ID as string,
    redirect_uri: 'http://localhost:4000/auth/facebook/callback',
    code_verifier: codeVerifier,
    code,
  };
  for (const key in params) tokenEndpoint.searchParams.set(key, params[key]);

  const res = await fetch(tokenEndpoint.toString());
  if (!res.ok) throw Error("Error getting Facebook's id_token.");

  // `clone()` prevents the 'Body is unusable error': https://stackoverflow.com/a/54115314/8434369
  const data = (await res.clone().json()) as FacebookTokenEndpointResponse;
  const payload = parseJwtPayload(data.id_token);

  return {
    id: payload.sub,
    name: payload.name,
    email: payload.email || null,
  } as OAuthUser;
}
