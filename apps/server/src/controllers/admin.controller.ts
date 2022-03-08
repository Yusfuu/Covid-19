import { User } from '@models/User';
import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: 'User not found',
    });
  }
  //@ts-ignore
  const isMatch = password === (user.password as string);
  if (!isMatch) {
    return res.status(400).json({
      message: 'Invalid password',
    });
  }
  return res.status(200).json({
    user,
  });
};
