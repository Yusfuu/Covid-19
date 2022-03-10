import * as React from 'react';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Swal from 'sweetalert2'


type Props = {
  updateAuthorisation: any;
  nextClicked: number;
  setAge:any

};

const Step1 :React.FC<Props> = ({updateAuthorisation,nextClicked,setAge})=> {


  const [value, setValue] = React.useState<Date | null>(new Date());
  
  if(nextClicked==1){

    var ageUser=value.getFullYear();
    var thisYear=new Date()
    console.log(thisYear.getFullYear()-ageUser)
    if((thisYear.getFullYear()-ageUser)>12){
          updateAuthorisation(1);
          setAge(value)
    }else{

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: " Vous n'avez pas l'accée de vaciner",
        footer: "Vous êtes  moins de 12 ans"
      })
      
    }

  }

  return (
    <div className=" flex flex-col items-center justify-center mt-10">
        
   <p className="font-semibold text-xl mb-10">Quelle est Votre date de naissance  :</p>    
   <LocalizationProvider dateAdapter={AdapterDateFns}>
   <DatePicker
          disableFuture
          label="Age"
          openTo="year"
          views={['year', 'month', 'day']}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
    </div>
  );
}

export default Step1