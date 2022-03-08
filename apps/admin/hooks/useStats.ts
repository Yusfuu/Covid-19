import { useQuery } from 'react-query';
import { fetcher } from './fetcher';

export const useStats = () => {
  return useQuery('stats', () =>
    fetcher(`${process.env.NEXT_PUBLIC_BACKEND}/center/stats`)
  );
};
