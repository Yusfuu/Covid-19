import type { NextPage } from 'next';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


import Button from '@mui/material/Button';

import Swal from 'sweetalert2'

type Props = {

  updateAuthorisation: any;
  setVaccin: any;
  nextClicked: number;
};


const Step2 : React.FC<Props>=({updateAuthorisation,setVaccin,nextClicked})=> {



  const [numroVaccin, setNumroVaccin] = React.useState('');
  const [isSelectedVaccin, setIsSelectedVaccin] = React.useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setNumroVaccin(event.target.value as string);
    setIsSelectedVaccin(true);
  };



  if(nextClicked==1){
    if(isSelectedVaccin){
      setVaccin(numroVaccin)
          updateAuthorisation(1);}
    // }else{
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Vous voudrais selectionner, la phase de vaccin que vous avez besion de vacciner ',
    //   })
    // }

  }
  return (
    <div className="flex flex-col justify-center items-center">

      <p className="font-semibold text-xl mb-5 mt-5"> Vous avez besoin de faire?  </p>

      <div className="flex  xl:w-1/3 justify-center">

      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Vaccin</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={numroVaccin}
          name="vaccin"
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={1}>Vaccin1</MenuItem>
          <MenuItem value={2}>Vaccin2</MenuItem>
          <MenuItem value={3}>Vaccin3</MenuItem>
        </Select>
      </FormControl>
    </Box>
      </div>

        

    </div>
  );
}

export default Step2