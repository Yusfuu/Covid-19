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
  // const { shot } = req.body;

  const [first, second, third] = await User.aggregate([
    {
      $group: {
        _id: '$vaccinations.shot',
        count: {
          $count: {},
        },
      },
    },
  ]);

  const stats = {
    first,
    second,
    third,
  };

  res.status(200).json({
    stats,
  });
});

export const getCenters = catchAsync(async (req: Request, res: Response) => {
  const centers = await Center.find();

  res.status(200).json({
    centers,
  });
});
