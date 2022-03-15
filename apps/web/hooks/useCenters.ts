import { useQuery } from 'react-query';
import { fetcher } from './fetcher';

export const useCenters = () => {
  return useQuery('centers', () =>
    fetcher('http://localhost:5000/api/center/centers')
  );
};
