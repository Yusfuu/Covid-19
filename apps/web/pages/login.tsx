import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Checkbox from '@material-ui/core/Checkbox';
import LoginFetch from '@/apis/login';
import axios from 'axios';
import { useRouter } from 'next/router'



const useStyles = makeStyles({

    rootPrincipal: {
      
            display: 'flex',
            height:'90vh',
            width: '100%',
            backgroundColor: '#F6F5F5',
            alignItems:'center',
            justifyContent:'center',
    },

    root:{
        color:'black',

        display: 'flex',
        flexDirection:'column',
        width: '35%',
        alignItems:'center',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        justifyContent: 'center',
        backgroundColor:'white',
        padding: '40px',
        borderRadius:'15px',
    },

    '@media (max-width: 1100px)': {
        root: {

            width: '60%',
          
        },},
    '@media (max-width: 768px)': {

        root: {

            width: '85%',
          
        },},
    '@media (max-width: 1260px)': {

        root: {

            width: '60%',
           
          
        },},
    '@media (max-width: 478px)': {

        root: {

            width: '75%',
           
          
        },},

    h3:{
        color:'#E6B31E',
        fontSize:'25px',
        marginBottom:'45px',

    },
    inputWidth:{

        width:'100%',
        marginBottom:'45px',
        fontSize:'20px'
    },

    partLink:{
        display:'flex',
        justifyContent:'space-between',
        alignItems: 'center',
    },

    button: {
      background: '#E6B31E',
      border: 0,
      borderRadius: 5,
      color: 'white',
      height: 48,
      padding: '0 30px',
      fontSize:'18px',
      "&:hover": {
        border: '2px solid' ,
        borderColor:'#E6B31E',
        backgroundColor:'fff',
        color:'#E6B31E',
        
      },
      composes: '$inputWidth',
    },

    chekbox:{
        
    },
  });

  function Login(){

    const[error,setErr]=useState("");
    const[existErr,setexistErr]=useState(true);
    const [acteur, setActeur] = useState("");

    const router = useRouter()

 

    // const user = useSelector((state) => state.user.user)

  
    const [values, setValues] = React.useState({
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
    });


    const classes =useStyles();

    const checkAuth= async (e:any)=>{
      e.preventDefault();
      let body={
       email:e.target.email.value,
       password:e.target.password.value
      };

      let url="http://localhost:5000/api/responsable/login";
      let res=  await  axios.post(url,  body );

      if(res.status===202){
        console.log("dazzz")
          console.log(res.data);
          setErr("");
          setexistErr(false);
          localStorage.setItem("token",res.data.token)
          router.push("/responsable")

        
      } else if (res.status===203) {
        setexistErr(true);
       }

      if(existErr==true){
        setErr(res.data.message)
      }
    }
  
    const handleChange = (prop:any) => (event:any) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
  
    const handleMouseDownPassword = (event:any) => {
      event.preventDefault();
    };

    return (

        <div className={classes.rootPrincipal} >  
        <div className={classes.root}>
            <h3 className={classes.h3}> Vous Être un {acteur}</h3>

            <form onSubmit={e => {checkAuth(e)}}>

                    
          <TextField  id="standard-basic"name="email" type="email" label="Email" className={classes.inputWidth} />

          <FormControl className={classes.inputWidth}>
          <InputLabel style={{fontSize:'20px'}}  htmlFor="standard-adornment-password">Password</InputLabel>
          <Input 
          name="password"
          id="standard-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
          <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {values.showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
          </InputAdornment>
          }
          />
          </FormControl>

          <p style={{color:'red',fontSize:"17px"}}> {error} </p>
          <div  className={clsx(classes.partLink,classes.inputWidth)} >

          <FormControlLabel  
              value="end"
              control={<Checkbox color="primary" />}
              label="Rester connecté"
              labelPlacement="end"
            />
            <a href="#" style={{textDecoration:"none",color:"#A8A8A7",fontSize:"17px"}}>Mot de passe oublié</a>
            </div>
                  <Button className={clsx(classes.button,classes.inputWidth)} type="submit"  >Login</Button>

                  <p style={{color:"#A8A8A7",fontSize:"17px"}}>Vous êtes pas encore inscrir?  <a style={{textDecoration:"none",color:"#E6B31E",fontSize:"17px"}} href="#">S'inscrir ici</a> </p>

            </form>

        </div>
        </div>

    )
}

export default Login;