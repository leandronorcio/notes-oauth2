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

interface OAuthUser {
  id: string | number;
  email: string;
  name: string;
}
