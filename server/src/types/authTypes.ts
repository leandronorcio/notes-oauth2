interface OAuthUser {
  id: string | number;
  name: string;
  // OAuth 2.0 providers do not always return an email
  email?: string | null;
}

// Start Github
interface GithubResponse {
  access_token: string;
  scope: string;
  token_type: string;
}

type GithubEmails = Array<{
  email: string;
  verified: boolean;
  primary: boolean;
  visibility: string;
}>;

// Start Google
interface GoogleTokenEndpointResponse {
  access_token: string;
  scope: string;
  token_type: string;
  expires_in: number;
  id_token: string;
}

// Start Facebook
interface FacebookTokenEndpointResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  id_token: string;
}
