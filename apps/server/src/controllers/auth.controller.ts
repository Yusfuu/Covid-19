import { Admin } from '@models/Admin';
import { Director } from '@models/Director';
import { catchAsync } from '@utils/catchAsync';
import { Request, Response } from 'express';

const models: any = {
  admin: Admin,
  director: Director,
};

export const logut = catchAsync(async (req: Request, res: Response) => {
  await req.session.destroy();
  return res.json({ user: null });
});

export const me = catchAsync(async (req: Request, res: Response) => {
  //@ts-ignore
  const user = req.session.user || null;
  return res.json({ user });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password, role = null } = req.body;

  if (!role) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide a role',
    });
  }

  const model = models[role];

  const user = await model.findOne({ email });

  if (!user) {
    return res.status(400).json({
      status: 'fail',
      message: 'User not found',
    });
  }

  const isMatch = user.password === password;

  if (!isMatch) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid password',
    });
  }

  const { password: _, ...rest } = user.toJSON();

  rest.role = role;

  res.json({ user: rest });
});
