import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken';

const login = async (credentials: any) => {
  const raw = JSON.stringify(credentials);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: raw,
  };

  const response = await fetch('http://localhost:5000/api/auth/login', options);
  return await response.json();
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {},
        async authorize(credentials) {
          const response = await login(credentials);
          if (response.user) {
            return response.user;
          } else {
            throw new Error('something went wrong');
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          const { _id, email, name, regional, role } = user;
          token.user = { _id, email, name, regional, role };
        }
        return token;
      },
      async session({ session, token }) {
        //@ts-ignore
        const id = token.user._id;
        const accessToken = jwt.sign(
          { id },
          '51sQRtfbq8BOkhCtan0UGegua303sXFh',
          { expiresIn: '1h' }
        );
        session.accessToken = accessToken;
        //@ts-ignore
        session.user = token.user;
        return session;
      },
    },
    secret: '51sQRtfbq8BOkhCtan0UGegua303sXFh',
    session: {
      strategy: 'jwt',
    },
  });
}
