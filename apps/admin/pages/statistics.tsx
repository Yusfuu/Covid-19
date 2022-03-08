import { useStats } from '@/hooks/useStats';
import {
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  const handleTabsChange = (index: number) => {
    console.log(index);
  };

  const { data } = useStats();

  return (
    <>
      <Head>
        <title>Statistics </title>
      </Head>

      <div className='bg-white py-6 sm:py-8 lg:py-12'>
        <div className='max-w-screen-2xl px-4 md:px-8 mx-auto'>
          <div className='max-w-xl flex flex-col items-center text-center mx-auto'>
            <h1 className='text-black-800 text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12'>
              Revolutionary way to build the web
            </h1>
            <div className='w-full flex flex-col sm:flex-row sm:justify-center gap-2.5'>
              <button className='inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3'>
                Start now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-blue-100 mx-2 p-5 rounded-md shadow-md'>
        <StatGroup>
          <Stat>
            <StatLabel>shot one</StatLabel>
            <StatNumber>{data?.stats?.first?.count}</StatNumber>
            <StatHelpText>
              <StatArrow type='increase' />
              23.36%
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>shot two</StatLabel>
            <StatNumber>{data?.stats?.second?.count}</StatNumber>
            <StatHelpText>
              <StatArrow type='decrease' />
              9.05%
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>shot three</StatLabel>
            <StatNumber>{data?.stats?.third?.count}</StatNumber>
            <StatHelpText>
              <StatArrow type='decrease' />
              9.05%
            </StatHelpText>
          </Stat>
        </StatGroup>
      </div>

      {/* <Tabs isFitted variant='soft-rounded' onChange={handleTabsChange}>
        <TabList>
          <Tab>Shot One</Tab>
          <Tab>Shot Two</Tab>
          <Tab>Shot Three</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs> */}
    </>
  );
};

export default Home;
