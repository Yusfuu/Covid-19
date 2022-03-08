import { useQuery } from 'react-query';
import { fetcher } from './fetcher';

export const useCenters = () => {
  return useQuery('centers', () =>
    fetcher(`${process.env.NEXT_PUBLIC_BACKEND}/center/centers`)
  );
};
