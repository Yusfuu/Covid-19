import { useQuery } from 'react-query';
import { fetcher } from './fetcher';

export const useStats = () => {
  return useQuery('stats', () =>
    fetcher('http://localhost:5000/api/center/stats')
  );
};
