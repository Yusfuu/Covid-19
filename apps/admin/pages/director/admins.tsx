import type { NextPage } from 'next';
import Head from 'next/head';
import {
  useDeleteAdminMutation,
  useAdmins,
  useAddAdminMutation,
} from '@/hooks/useAdmins';
import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Spinner,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  ButtonGroup,
  PopoverFooter,
  useToast,
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
  Select,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import generator from 'generate-password';

import { Bannaer } from '@/components/Banner';
import { Footer } from '@/components/Footer';

const Director: NextPage = () => {
  const { data, isLoading } = useAdmins();

  return (
    <>
      <Head>
        <title>Director Dashboard (admins)</title>
      </Head>

      <Bannaer />
      <AdminDrawer />
      <div className='m-5'>
        <Table variant='simple'>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>email</Th>
              <Th>regional</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!isLoading &&
              data?.admins?.map(({ _id, name, email, regional }: any) => (
                <Tr key={_id}>
                  <Td>{name}</Td>
                  <Td>{email}</Td>
                  <Td>{regional}</Td>
                  <Td>
                    <Pop id={_id} name={name} />
                  </Td>
                </Tr>
              ))}
          </Tbody>
          {isLoading && <Spinner />}
          <Tfoot></Tfoot>
        </Table>
        <Footer />
      </div>
    </>
  );
};

const Pop = ({ id, name }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const queryClient = useQueryClient();

  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const { mutate } = useDeleteAdminMutation({
    onMutate: () => {
      setloading(true);
    },
    onSuccess: () => {
      close();
      queryClient.invalidateQueries('admins');
      toast({
        title: 'Admin Deleted.',
        description: `${name} has been deleted.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return (
    <Popover isOpen={isOpen} onClose={close}>
      <PopoverTrigger>
        <Button onClick={open}>Delete</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader>
        <PopoverBody>Are you sure you want to have Delete {name} ?</PopoverBody>
        <PopoverFooter d='flex' justifyContent='flex-end'>
          <ButtonGroup size='sm'>
            <Button onClick={open} variant='outline'>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              //@ts-ignore
              onClick={() => mutate({ id })}
              colorScheme='red'>
              Apply
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

const AdminDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<any>();
  const [name, setName] = useState<any>('');
  const [regional, setRegion] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [loading, setLoading] = useState<any>(false);
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate } = useAddAdminMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data: any) => {
      setLoading(false);
      queryClient.invalidateQueries('admins');
      toast({
        title: 'Admin created.',
        description: `${data.name} has been created.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
      setName('');
      setRegion('');
      setEmail('');
    },
  });

  const handleSubmit = () => {
    const password = generator.generate({
      length: 10,
      numbers: true,
    });
    //@ts-ignore
    mutate({ name, regional, email, password });
  };

  return (
    <>
      <div className='w-full flex justify-center'>
        <Button colorScheme='teal' onClick={onOpen}>
          Create Admin
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
          <DrawerHeader>Create Admin</DrawerHeader>

          <DrawerBody className='space-y-5'>
            <div>
              <FormLabel htmlFor='username'>Name</FormLabel>
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder='Type here...'
              />
            </div>

            <div>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <Input
                type='email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder='Type here...'
              />
            </div>

            <div>
              <FormLabel htmlFor='username'>Region</FormLabel>

              <Select
                onChange={(event) => setRegion(event.target.value)}
                placeholder='Select option'>
                <option value='Casablanca-Settat'>Casablanca-Settat</option>
                <option value='Marrakech-Safi'>Marrakech-Safi</option>
                <option value='Souss-Massa'>Souss-Massa</option>
                <option value='Tanger-Tétouan-Al Hoceïma'>
                  Tanger-Tétouan-Al Hoceïma
                </option>
              </Select>
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
};

export default Director;
