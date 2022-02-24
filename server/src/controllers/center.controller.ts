import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import { Center } from '@models/Center';
import { User } from '@models/User';

// create center
export const createCenter = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;

  const center = await Center.create(body);

  res.status(201).json({
    center,
  });
});

// show stats
export const showStats = catchAsync(async (req: Request, res: Response) => {
  const { shot } = req.body;

  const users = await User.find({
    vaccinations: {
      $elemMatch: {
        shot,
      },
    },
  }).count();

  res.status(200).json({
    shot,
    users,
  });
});
