import { Bannaer } from '@/components/Banner';
import { useDirictorStats } from '@/hooks/useStats';
import type { NextPage } from 'next';
import Head from 'next/head';
const Director: NextPage = () => {
  const { data } = useDirictorStats();
  console.log(data);

  return (
    <>
      <Head>
        <title>Director Dashboard</title>
      </Head>
      <Bannaer />
      <div className='bg-white py-6 sm:py-8 lg:py-12'>
        <div className='max-w-screen-xl px-4 md:px-8 mx-auto'>
          <div className='mb-10 md:mb-16'>
            <h2 className='text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6'>
              Our Team by the numbers
            </h2>

            <p className='max-w-screen-md text-gray-500 md:text-lg text-center mx-auto'>
              This is a section of some simple filler text, also known as
              placeholder text. It shares some characteristics of a real written
              text but is random or otherwise generated.
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 md:divide-x gap-8 md:gap-0'>
            <div className='flex flex-col items-center md:p-4'>
              <div className='text-indigo-500 text-xl sm:text-2xl md:text-3xl font-bold'>
                {data?.admins}
              </div>
              <div className='text-sm sm:text-base font-semibold'>Admins</div>
            </div>
            <div className='flex flex-col items-center md:p-4'>
              <div className='text-indigo-500 text-xl sm:text-2xl md:text-3xl font-bold'>
                {data?.centers}
              </div>
              <div className='text-sm sm:text-base font-semibold'>Centers</div>
            </div>

            <div className='flex flex-col items-center md:p-4'>
              <div className='text-indigo-500 text-xl sm:text-2xl md:text-3xl font-bold'>
                {data?.users}
              </div>
              <div className='text-sm sm:text-base font-semibold'>Users</div>
            </div>

            <div className='flex flex-col items-center md:p-4'>
              <div className='text-indigo-500 text-xl sm:text-2xl md:text-3xl font-bold'>
                A couple
              </div>
              <div className='text-sm sm:text-base font-semibold'>
                Coffee breaks
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Director;
