import { RequestHandler } from 'express';
import { OAuthUser } from '../types/authTypes';
import AccountModel from '../models/account';
import UserModel from '../models/user';
import jwt from 'jsonwebtoken';

export const login: RequestHandler = async (req, res) => {
  const {
    id: oAuthId,
    name,
    email,
    avatar,
  } = res.locals.oAuthUser as OAuthUser;

  const providerAccountId = oAuthId.toString();
  const account = await AccountModel.findUnique('GITHUB', providerAccountId);
  let userId = 0;

  // Register the user to our app if they're not yet registered
  if (!account) {
    const createUser = await UserModel.create({ name, email, avatar });
    await AccountModel.create({
      provider: 'GITHUB',
      providerAccountId,
      userId: createUser.id,
    });

    userId = createUser.id;
  } else {
    userId = account.userId;
  }

  // Login the user into our app by setting an HttpOnly cookie `refreshToken`,
  // which shall be used for issuing access tokens to the user.
  const refreshToken = jwt.sign(
    { sub: userId, name },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '90d',
    }
  );
  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 60 * 60 * 1000,
    httpOnly: true,
    path: '/auth/refresh',
  });

  console.log('refresh token: ' + refreshToken);

  res.redirect('http://localhost:5173/notes');
};
