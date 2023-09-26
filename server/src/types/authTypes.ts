export type OAuthProviders = 'GITHUB' | 'GOOGLE' | 'FACEBOOK';
export interface OAuthUser {
  id: string | number;
  name: string;
  // OAuth 2.0 providers do not always return an email
  email?: string | null;
  avatar?: string | null;
}

export interface Account {
  id: number;
  provider: OAuthProviders;
  providerAccountId: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email?: string | null;
  avatar?: string | null;
}

// Start Github
export interface GithubResponse {
  access_token: string;
  scope: string;
  token_type: string;
}

export type GithubEmails = Array<{
  email: string;
  verified: boolean;
  primary: boolean;
  visibility: string;
}>;

// Start Google
export interface GoogleTokenEndpointResponse {
  access_token: string;
  scope: string;
  token_type: string;
  expires_in: number;
  id_token: string;
}

// Start Facebook
export interface FacebookTokenEndpointResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  id_token: string;
}
