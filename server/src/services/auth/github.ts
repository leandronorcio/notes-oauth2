/**
 * Exchange a Github authorization code for an access token.
 * @param code - string
 * @returns GithubResponse
 */
export async function getGithubAccessToken(code: string) {
  const tokenEndpoint = 'https://github.com/login/oauth/access_token';
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code,
    redirect_uri: 'http://localhost:4000/auth/github/callback',
  };

  const res = await fetch(tokenEndpoint, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!res.ok) throw Error('Error getting an access token.');
  return (await res.json()) as GithubResponse;
}

/**
 * Use Github's OAuth token to get the user's Github profile.
 * @param accessToken - string
 */
export async function getGithubUser(accessToken: string) {
  const apiUrl = 'https://api.github.com/user';
  const headers = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const user = await fetch(apiUrl, headers);
  const userEmails = await fetch(`${apiUrl}/emails`, headers);

  if (!user.ok || !userEmails.ok) throw Error("Error getting user's info.");

  // Get the user's primary email
  // https://docs.github.com/en/rest/users/emails?apiVersion=2022-11-28#list-email-addresses-for-the-authenticated-user
  const emails = (await userEmails.json()) as GithubEmails;
  const primaryEmail = emails.filter(
    ({ verified, primary }) => verified && primary
  );

  const { id, name } = await user.json();
  return {
    id,
    name,
    email: primaryEmail[0].email,
  } as OAuthUser;
}
