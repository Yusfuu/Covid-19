import type { NextPage } from 'next';
import { withIronSessionSsr } from 'iron-session/next';

const cn =
  'mr-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const About: NextPage = ({ user }: any) => {
  const login = async () => {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();
    console.log(data);
  };

  const me = async () => {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/me`, {
      credentials: 'include',
    });
    const data = await response.json();
    console.log(data);
  };

  const logout = async () => {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/logout`, {
      credentials: 'include',
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className='m-5'>
      <h1 className='my-2'>
        {user ? 'Logged in as ' + user.name : 'not logged in'}
      </h1>
      <button className={cn} onClick={login}>
        login
      </button>
      <button className={cn} onClick={me}>
        me
      </button>
      <button className={cn} onClick={logout}>
        logout
      </button>
    </div>
  );
};

// const withUser =

export const getServerSideProps = withIronSessionSsr(
  async function ({ req, res }) {
    //@ts-ignore
    const user = req?.session?.user || null;
    console.log(user);

    return {
      props: { user },
    };
  },
  {
    cookieName: 'session-app',
    password: 'WuiH12k4teOueGzMflhzvghJHwbw2InJ',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  }
);
export default About;
