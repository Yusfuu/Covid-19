import jwt from 'jsonwebtoken';

const keys: any = {
  ADMIN: process.env.ADMIN_SECRET_KEY,
};

export const createToken = (
  payload: any = null,
  role: string | null = null
) => {
  if (!payload) {
    throw new Error('payload is required');
  }

  if (!role) {
    throw new Error('role is required');
  }

  const _key = keys[role];

  if (!_key) {
    throw new Error('role is not found');
  }

  return jwt.sign(payload, _key, { expiresIn: '1h' });
};
