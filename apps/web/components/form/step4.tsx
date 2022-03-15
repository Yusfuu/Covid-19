import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useCenters } from '../../hooks/useCenters';

type Props = {
  isFinish: number;
};

const Step4: React.FC<Props> = ({ isFinish }) => {
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    const url = 'http://localhost:5000/api/center/centers';

    const fetchCenters = async () => {
      try {
        let response = await fetch(url);
        let json = await response.json();
        console.log(json.centers);
        setCenters(json.centers);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchCenters();
  }, []);

  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='text-2xl mb-10 mt-10'> Remplir cette Formulaire :</p>
      <div className='flex flex-wrap xl:w-2/3 justify-between '>
        <TextField
          className='mb-6 w-96 '
          name='nom'
          label={'Nom'}
          type='text'
          id='margin-dense'
        />
        <TextField
          className='mb-6 w-96 '
          name='prenom'
          label={'Prenom'}
          type='text'
          id='margin-dense'
        />
        <TextField
          className='mb-6 w-96  '
          name='tele'
          label={'Numero de telephone'}
          type='tel'
          id='margin-dense'
        />
        <TextField
          className='mb-6  w-96 '
          name='cne'
          label={'CNE'}
          type='text'
          id='margin-dense'
        />
        <TextField
          className='mb-6  w-96 '
          name='address'
          label={'Adress'}
          type='text'
          id='margin-dense'
        />

        <FormControl className='mb-6  w-96 ' fullWidth>
          <InputLabel id='demo-simple-select-label'>Centre</InputLabel>

          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            name='centre'
            label='Centre'>
            {centers.map((center: any) => (
              <MenuItem value={'center aloui'}>{center.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Step4;
