import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRef, useState } from 'react';
import { useCenters } from '@/hooks/useCenter';
import { useMutation } from '@/hooks/useMutation';
import { motion } from 'framer-motion';
import { useQueryClient } from 'react-query';
import Link from 'next/link';

const Card = ({ title, bg }: any) => {
  return (
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
  );
};

const Banner = () => {
  return (
    <div className='bg-white pb-6 sm:pb-8 lg:pb-12'>
      <div className='flex flex-wrap sm:flex-nowrap sm:justify-center sm:items-center bg-indigo-500 relative sm:gap-3 px-4 sm:pr-8 ms:px-8 py-3'>
        <div className='order-1 sm:order-none w-11/12 sm:w-auto max-w-screen-sm inline-block text-white text-sm md:text-base mb-2 sm:mb-0'>
          This is a section of some simple filler text, also known as
          placeholder text.
        </div>

        <Link href='/statistics'>
          <span className='order-last sm:order-none w-full sm:w-auto inline-block bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:ring ring-indigo-300 text-white text-xs md:text-sm font-semibold text-center whitespace-nowrap rounded-lg outline-none transition duration-100 px-4 py-2'>
            statistics
          </span>
        </Link>

        <div className='order-2 sm:order-none w-1/12 sm:w-auto flex justify-end items-start sm:absolute sm:right-0 sm:mr-1 xl:mr-3'>
          <button
            type='button'
            className='text-white hover:text-indigo-100 active:text-indigo-200 transition duration-100'></button>
        </div>
      </div>
    </div>
  );
};

function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<any>();
  const [center, setCenter] = useState<any>('');
  const [region, setRegion] = useState<any>('');
  const [loading, setLoading] = useState<any>(false);
  const queryClient = useQueryClient();

  const mutation = useMutation('/center/create', {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      queryClient.invalidateQueries(['centers']);
    },
  });

  const handleSubmit = () => {
    const Center = {
      name: center,
      region,
    };

    mutation.mutate(Center);
  };

  return (
    <>
      <div className='w-full flex justify-center '>
        <Button colorScheme='teal' onClick={onOpen}>
          Create Center
        </Button>
      </div>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create Center</DrawerHeader>

          <DrawerBody className='space-y-5'>
            <div>
              <FormLabel htmlFor='username'>Name</FormLabel>
              <Input
                value={center}
                onChange={(event) => setCenter(event.target.value)}
                placeholder='Type here...'
              />
            </div>

            <div>
              <FormLabel htmlFor='username'>Region</FormLabel>
              <Input
                value={region}
                onChange={(event) => setRegion(event.target.value)}
                placeholder='Type here...'
              />
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              onClick={handleSubmit}
              colorScheme='blue'>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const Home: NextPage = () => {
  const { data, isLoading } = useCenters();

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Banner />
      <DrawerExample />
      <CardContainer>
        {data.centers.map((center: any) => (
          <Center {...center} key={center._id} />
        ))}
      </CardContainer>
    </>
  );
};

const Center = ({ name, region }: any) => {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      variants={{ hidden: { opacity: 0, y: -20 }, show: { opacity: 1, y: 0 } }}
      className='ring-violet-pink-100 ring-violet-300 ring-offset-2 focus:ring flex flex-col outline-none items-center shadow-md rounded-md border p-4 lg:p-8'>
      <div className='w-24 md:w-32 h-24 md:h-32  rounded-full overflow-hidden  mb-2 md:mb-4'>
        <img
          src='https://img.icons8.com/color/480/000000/hospital-3.png'
          loading='lazy'
          alt='Photo by Radu Florin'
          className='w-full h-full object-cover object-center'
        />
      </div>

      <div className='flex flex-col justify-center items-center gap-3'>
        <div className='truncate'>
          <div className='text-gray-900 md:text-lg font-semibold text-center'>
            {name}
          </div>
          <div className='text-gray-600  text-sm text-center min-w-min'>
            {region}
          </div>
        </div>
        <span className='capitalize px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
          smtng
        </span>
      </div>
    </motion.button>
  );
};

const CardContainer = ({ children }: any) => {
  return (
    <motion.div
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      initial='hidden'
      animate='show'
      className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='max-w-screen-xl px-4 md:px-8 mx-auto'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8'>
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
