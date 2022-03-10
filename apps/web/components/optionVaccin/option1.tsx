import type { NextPage } from 'next';
import * as React from 'react';
import Stack from '@mui/material/Stack';


import Button from '@mui/material/Button';

import Swal from 'sweetalert2'

type Props = {

  updateAuthorisation: any;
  nextClicked: number;
};


const Option1 : React.FC<Props>=({updateAuthorisation,nextClicked})=> {

  const [malade, setMalade] = React.useState(0);


  const isMalade = () => {
    setMalade(1);
    Swal.fire({
      title: 'Remarque important',
      text: " Vous devez utiliser ces traitements  avant de prendre le vaccin",
    })
    setMalade(1);
  }

  if(nextClicked==1){
    if(malade==1){
          updateAuthorisation(1);
    }

  }

 
  return (
    <div className="flex flex-col justify-center items-center">

      <p className="font-semibold text-xl mb-5 mt-5"> Souffrez-vous de maladies ?  </p>

      <div className="flex  xl:w-1/3 justify-center">

     <Stack direction="row" spacing={2}>
     <Button className="mb-5" variant="outlined" onClick={isMalade}>Oui</Button>
    </Stack>
      </div>
      <p className="font-semibold text-xl mb-10"> Si ne souffrez-vous pas de maladies vous pouvez  continue  </p>
     
    </div>
  );
}

export default Option1