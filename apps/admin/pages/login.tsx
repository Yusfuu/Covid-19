import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getSession, signIn, useSession } from 'next-auth/react';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { data: session } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const toast = useToast();
  const router = useRouter();

  const login = async () => {
    const crediantials = {
      email,
      password,
      role,
    };
    const result = await signIn('credentials', {
      ...crediantials,
      redirect: false,
      callbackUrl: '/admin',
    });

    // @ts-ignore
    if (result?.error) {
      toast({
        title: 'Error',
        //@ts-ignore
        description: result.error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
    console.log(result);
  };

  useEffect(() => {
    if (session) {
      //@ts-ignore
      router.replace('/' + session.user.role);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className='bg-white py-6 sm:py-8 lg:py-12'>
        <div className='max-w-screen-2xl px-4 md:px-8 mx-auto'>
          <h2 className='text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8'>
            Login
          </h2>

          <div className='max-w-lg border rounded-lg mx-auto'>
            <div className='flex flex-col gap-4 p-4 md:p-8'>
              <div>
                <label
                  htmlFor='email'
                  className='inline-block text-gray-800 text-sm sm:text-base mb-2'>
                  Email
                </label>
                <input
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                  name='email'
                  className='w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2'
                />
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='inline-block text-gray-800 text-sm sm:text-base mb-2'>
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  name='password'
                  type='password'
                  className='w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2'
                />
              </div>

              <div>
                <div className='flex items-center gap-5'>
                  <div className='flex items-center gap-2'>
                    <input
                      onClick={(e) => setRole('admin')}
                      id='push-everything'
                      name='push-notifications'
                      type='radio'
                      className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
                    />
                    <label className='text-sm font-medium text-gray-700'>
                      Admin
                    </label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <input
                      onClick={(e) => setRole('director')}
                      id='push-everything'
                      name='push-notifications'
                      type='radio'
                      className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
                    />
                    <label className='text-sm font-medium text-gray-700'>
                      Director
                    </label>
                  </div>
                </div>
              </div>

              <button
                onClick={login}
                className='block bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3'>
                Log in
              </button>
            </div>

            <div className='flex justify-center items-center bg-gray-100 p-4'>
              <p className='text-gray-500 text-sm text-center'>
                Don't have an account?{' '}
                <a
                  href='#'
                  className='text-indigo-500 hover:text-indigo-600 active:text-indigo-700 transition duration-100'>
                  Register
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (session) {
    //@ts-ignore
    const role = session?.user.role;
    return { redirect: { destination: `/${role}`, permanent: false } };
  }

  // if (!session) {
  //   return { redirect: { destination: '/login', permanent: false } };
  // }

  return {
    props: {
      session,
    },
  };
}

export default Home;
