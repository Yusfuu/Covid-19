import * as React from 'react';

import TextField from '@mui/material/TextField';


type Props = {

  updateAuthorisation: any;
  nextClicked: number;
};


const Option3 : React.FC<Props>=({updateAuthorisation,nextClicked})=> {



  if(nextClicked==1){
    updateAuthorisation(1); 
  }

 
  return (
    <div className="flex flex-col justify-center items-center">

      <p className="font-semibold text-xl mb-5 mt-5"> Souffrez-vous des effets secondaires suite au deuxième  vaccin ?  </p>

      <div className="flex  xl:w-1/3 justify-center">
      <TextField
          id="outlined-multiline-static"
          label="Effets secondaires"
          name="effectSecondaireVaccin2"
          multiline
          rows={4}
        />      </div>
      <p className="font-semibold text-xl mb-10"> Si ne souffrez-vous pas des effets secondaires vous pouvez  continue  </p>
     
    </div>
  );
}

export default Option3