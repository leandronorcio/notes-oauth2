interface OAuthUser {
  id: string | number;
  email: string;
  name: string;
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
