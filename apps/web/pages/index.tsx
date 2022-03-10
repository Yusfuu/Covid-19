import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Header from '@/components/header';
import FormInscription from '@/components/formInscription';
import Description from '@/components/description';

const Home: NextPage = () => {
  return (
    <div className='mx-24	'>
      <Header></Header>
      <Description></Description>
      <FormInscription></FormInscription>
    </div>
  );
};

export default Home;
