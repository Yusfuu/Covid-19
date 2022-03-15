import { useMutation, UseMutationOptions, useQuery } from 'react-query';
import { fetcher } from './fetcher';

export const useAdmins = () => {
  return useQuery('admins', () =>
    fetcher('http://localhost:5000/api/director/admins')
  );
};

export const useDeleteAdminMutation = (options: UseMutationOptions) => {
  return useMutation(
    (body) =>
      fetcher('http://localhost:5000/api/director/delete', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    options
  );
};

export const useAddAdminMutation = (options: UseMutationOptions) => {
  return useMutation(
    (body) =>
      fetcher('http://localhost:5000/api/director/create', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    options
  );
};
