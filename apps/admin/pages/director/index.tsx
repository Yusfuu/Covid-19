import { Bannaer } from '@/components/Banner';
import { Footer } from '@/components/Footer';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const DashboardCard = ({ title, bg, href }: any) => {
  return (
    <Link href={href}>
      <button
        className={`cursor-pointer min-h-full relative text-left select-none  shadow-lg rounded-xl ${bg}`}>
        <div className='py-8 text-white  border-t-0  border-yellow-200 px-7 rounded-xl'>
          <span className='text-xs font-semibold absolute top-0 -mt-3.5 rounded-full px-4 py-2 uppercase text-purple-500 bg-gray-800'>
            Resources
          </span>
          <h2 className='mb-5 text-5xl font-bold'>
            <span>{title}</span>
          </h2>
          <p className='mb-2 text-lg font-normal text-purple-100 opacity-100'>
            Quench satisfying designs to help you stir up emotion and tell a
            story.
          </p>
        </div>
      </button>
    </Link>
  );
};

const Director: NextPage = () => {
  return (
    <>
      <Head>
        <title>Director Dashboard</title>
      </Head>
      <Bannaer />
      <div className='flex items-stretch w-full gap-10 pb-10 mt-8 p-5  sm:mt-16'>
        <DashboardCard
          href='/director/admins'
          title='Create Admin'
          bg='bg-purple-500'
        />
        <DashboardCard
          href='/director/stats'
          title='Get statistics'
          bg='bg-blue-500'
        />
      </div>
      <Footer />
    </>
  );
};

export default Director;
