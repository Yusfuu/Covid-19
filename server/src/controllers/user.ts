import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import { User } from '@models/User';

export const create = catchAsync(async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: 'success',
    data: user,
  });
});
