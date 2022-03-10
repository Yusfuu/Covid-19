import type { NextPage } from 'next';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Option1 from '@/components/optionVaccin/option1';
import Option2 from '@/components/optionVaccin/option2';
import Option3 from '@/components/optionVaccin/option3';


import Button from '@mui/material/Button';

import Swal from 'sweetalert2'

type Props = {

  updateAuthorisation: any;
  nextClicked: number;
  vaccin:number
};


const Step3 : React.FC<Props>=({updateAuthorisation,nextClicked,vaccin})=> {

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

  let option;
  if(vaccin==1){
    option =<Option1 updateAuthorisation={updateAuthorisation} nextClicked={nextClicked} />;
  }else if(vaccin==2){
    option =<Option2 updateAuthorisation={updateAuthorisation} nextClicked={nextClicked} />;
  }
  else if(vaccin==3){
    option =<Option3 updateAuthorisation={updateAuthorisation} nextClicked={nextClicked} />;

  }
  return (
    <div className="flex flex-col justify-center items-center">
                {option}
</div>
  );
}

export default Step3