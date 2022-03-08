import { useMutation as Mutation, UseMutationOptions } from 'react-query';
import { fetcher } from './fetcher';

export const useMutation: any = (
  url: string,
  sideEffects: UseMutationOptions = {}
) => {
  return Mutation(
    (body: any) =>
      fetcher(process.env.NEXT_PUBLIC_BACKEND + url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    sideEffects
  );
};
