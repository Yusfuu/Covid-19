import type { NextPage } from 'next';
import * as React from 'react';
import Stack from '@mui/material/Stack';

import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';

import Swal from 'sweetalert2'

type Props = {

  updateAuthorisation: any;
  nextClicked: number;
};


const Option2 : React.FC<Props>=({updateAuthorisation,nextClicked})=> {



  if(nextClicked==1){
          updateAuthorisation(1);
    
  }

 
  return (
    <div className="flex flex-col justify-center items-center">

      <p className="font-semibold text-xl mb-5 mt-5"> Souffrez-vous des effets secondaires suite au premier vaccin ?  </p>

      <div className="flex  xl:w-1/3 justify-center">
      <TextField
          id="outlined-multiline-static"
          label="Effets secondaires"
          name="effectSecondaireVaccin1"
          multiline
          rows={4}
        />
      </div>
      <p className="font-semibold text-xl mb-10"> Si ne souffrez-vous pas des effets secondaires vous pouvez  continue  </p>
     
    </div>
  );
}

export default Option2