import { catchAsync } from '@utils/catchAsync';
import { Request, Response } from 'express';
import { Admin } from '@models/Admin';

export const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;

  const admin = await Admin.create(body);

  res.status(201).json({
    admin,
  });
});

export const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.body;

  await Admin.findByIdAndDelete(id);

  res.status(200).json({
    message: 'Admin deleted',
  });
});

export const getAdmins = catchAsync(async (req: Request, res: Response) => {
  const admins = await Admin.find();

  res.status(200).json({
    admins,
  });
});
