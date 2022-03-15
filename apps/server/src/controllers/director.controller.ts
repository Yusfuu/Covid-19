import { catchAsync } from '@utils/catchAsync';
import { Request, Response } from 'express';
import { Admin } from '@models/Admin';
import { Center } from '@models/Center';
import { User } from '@models/User';

export const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;

  const admin = await Admin.create(body);

  res.status(201).json(admin);
});

export const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.body;

  await Admin.findByIdAndDelete(id);

  res.status(200).json({
    message: 'Admin deleted',
  });
});

export const getAdmins = catchAsync(async (req: Request, res: Response) => {
  const admins = await Admin.find().select('-password').sort('-createdAt');

  res.status(200).json({
    admins,
  });
});

export const stats = catchAsync(async (req: Request, res: Response) => {
  const promises = [Admin.count(), Center.count(), User.count()];

  const [admins, centers, users] = await Promise.all(promises);

  res.status(200).json({
    admins,
    centers,
    users,
  });
});
