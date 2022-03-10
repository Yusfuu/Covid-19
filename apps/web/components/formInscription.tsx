import type { NextPage } from 'next';
import Step1 from '@/components/form/step1';
import Step2 from '@/components/form/step2';
import Step3 from '@/components/form/step3';
import Step4 from '@/components/form/step4';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'


const steps = ['Step1', 'Step2', 'Step3',"Step4"];

const FormInscription : NextPage=()=> {

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [authorise, setAuthorise] = React.useState(0);
  const [nextClicked, setNextClicked] = React.useState(0);
  const [isFinish, setIsFinish] = React.useState(0);
  const [age,setAge]= React.useState(0);
  const [vaccin,setVaccin]= React.useState(0);


  const create=(e:any) => {

    e.preventDefault();
    let effectVaccination;
    if(vaccin==2){
      effectVaccination=e.target.effectSecondaireVaccin1;
    }
    else if(vaccin==3){
      effectVaccination=e.target.effectSecondaireVaccin1;

    }
    let body={
      cin:e.target.cne.value,
      address:e.target.address.value,
      phone:e.target.tele.value,
      birthday:age,
      vaccinations: [{
        shot:vaccin,
      }  ],
      effet:"OIUYTRE",
      centre:e.target.centre.value,

    }

    fetch("http://localhost:5000/api/user/create",{
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(body)
    })
// We get the API response and receive data in JSON format
  .then((response) => response.json())
  .then((data) =>{
    console.log(data)
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: data.message,
      showConfirmButton: false,
      timer: 3000
    })

    updateAuthorisation(1);
    handleNext();
    
  }
   )
  .catch ((error) => console.error(error));
  }


  const updateAuthorisation=(number:number) => {

    setAuthorise(number);

  }

  let stepActuel;
  if (activeStep==0) {
    stepActuel = <Step1 updateAuthorisation={updateAuthorisation} nextClicked={nextClicked} setAge={setAge} />;
  }
  else if(activeStep==1){
    stepActuel = <Step2 updateAuthorisation={updateAuthorisation} nextClicked={nextClicked} setVaccin={setVaccin}   />;
  }
  else if(activeStep==2){
    stepActuel = <Step3 updateAuthorisation={updateAuthorisation} nextClicked={nextClicked}  vaccin={vaccin}  />;
  }
  else if(activeStep==3){
    stepActuel = <Step4 isFinish={isFinish}  />;
  }
  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {

    setNextClicked(1);
    if(authorise==1){
        let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    }

    if(activeStep==2){
      setIsFinish(1);
      console.log(isFinish);
    }
    setAuthorise(0);
    // setNextClicked(0);
    // setAuthorise(0);

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  }
  return (
    <form onSubmit={create} className="flex-col mb-10">

        
<Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {stepActuel}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Routeur
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
  
            {activeStep === steps.length - 1 ?  
            <Button type="submit" onClick={handleNext}>
            Terminer
            </Button>    :
            
            <Button onClick={handleNext}>
            Suivant
            </Button>  }

          </Box>
        </React.Fragment>
      )}
    </Box>       

    </form>
  );
}

export default FormInscription