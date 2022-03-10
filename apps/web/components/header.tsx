import type { NextPage } from 'next';
import Image from 'next/image'
import Button from '@mui/material/Button';





const Header : NextPage=()=> {
  return (
    <div className="flex justify-between items-center mb-10 mt-5 ">

      <Image
      src="/logo.png"
      alt="Logo"
      width={120}
      height={100}
    /> 
   <Button variant="outlined" size="large">
          Connecter nous
        </Button>    </div>
  );
}

export default Header