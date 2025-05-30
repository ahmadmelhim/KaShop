import { Box, Button, InputAdornment, TextField } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import DateRangeIcon from '@mui/icons-material/DateRange';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import axios from 'axios';

export default function Login() {
  const {register,handleSubmit}=useForm();
  const loginrUser= async (values)=>{
    const response=await axios.post(`http://mytshop.runasp.net/api/Account/Login`,values)
    console.log(response);
  }
  return (
    <Box component={'form'} onSubmit={handleSubmit(loginrUser)}> 
    
        <TextField
         {...register('email')}
          label="Email"
          type='email'
          sx={{ m: 1}}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <EmailIcon/>
              </InputAdornment>,
            },
          }}
        />

        <TextField
          {...register('password')}
          label="Password"
          type='password'
          sx={{ m: 1}}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <PasswordIcon/>
              </InputAdornment>,
            },
          }}
        />
        <Button variant='outlined' type='submit'> Login </Button>
        <Button sx={{ textAlign: 'center', mt: 1 }}>
        <Link to="/forgotPassword">Forgot your password?</Link>
      </Button>
        </Box>
  )
}
