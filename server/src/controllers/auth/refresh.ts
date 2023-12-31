import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/user';
import { verifyJwt } from '../../utils/verifyJwt';

export const refresh: RequestHandler = async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token)
    return res
      .status(401)
      .json({ error: 'Refresh token does not exist or has expired already.' });

  try {
    const decoded = verifyJwt(token);
    const user = await UserModel.findUnique(decoded.sub as unknown as number);
    if (!user) return res.sendStatus(401);

    const accessToken = jwt.sign(
      { sub: user.id, name: user.name },
      process.env.JWT_SECRET as string,
      { expiresIn: '2h' } // TODO: Decrease this in production
    );
    res.send({ accessToken, user });
  } catch (error) {
    res.sendStatus(400);
  }
};
