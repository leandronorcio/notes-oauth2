import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/user';

export const refresh: RequestHandler = async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await UserModel.findUnique(decoded.sub as unknown as number);
    if (!user) return res.sendStatus(401);

    const accessToken = jwt.sign(
      { sub: user.id, name: user.name },
      process.env.JWT_SECRET as string,
      { expiresIn: '15m' }
    );
    res.send({ accessToken, user });
  } catch (error) {
    res.sendStatus(400);
  }
};
