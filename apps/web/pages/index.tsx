import type { NextPage } from 'next';
import Header from '@/components/header';
import FormInscription from '@/components/formInscription';
import Description from '@/components/description';
import Head from 'next/head';
const Home: NextPage = () => {
  return (
    <div className='mx-24	'>
      <Head>
        <title>Inscription</title>
      </Head>
      <Header></Header>
      <Description></Description>
      <FormInscription></FormInscription>
    </div>
  );
};

export default Home;
