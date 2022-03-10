import type { NextPage } from 'next';
import Image from 'next/image'
import Button from '@mui/material/Button';




const Description : NextPage=()=> {
  return (
    <div className=" flex flex-wrap	 justify-between items-center  ">

        <div className="xl:w-1/2">
        <h4 className="" >Bienvenue sur le portail de la campagne de <strong className="strongText"><span> vaccination contre le coronavirus</span></strong></h4>
        </div>
        <div className="xl:w-1/2  flex justify-end">
        <Image
      src="/illustration1.png"
      alt="Logo"
      width={540}
      height={440}
        />
        </div>


        <style jsx>{`
        h4 {
            color:#203147 !important; 
            font-size: 41px;
             line-height: 52px;
                }
       .strongText  {
        color: #1d71b8!important;
            }
            @media (max-width: 768px) {
                h4 {
                    font-size: 20px;
                     line-height: 30px;
                        }
                
              }
            
      `}</style>
   
    </div>
  );
}

export default Description