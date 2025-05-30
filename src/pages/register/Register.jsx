import { Box, Button, InputAdornment, TextField } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import DateRangeIcon from '@mui/icons-material/DateRange';

import React from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
export default function Register() {
  const {register,handleSubmit}=useForm();
  const registerUser= async (values)=>{
    const response=await axios.post(`http://mytshop.runasp.net/api/Account/register`,values)
    console.log(response);
  }
  return (
    <Box component={'form'} onSubmit={handleSubmit(registerUser)}> 
    <TextField
          {...register('firstName')}
          label="First Name"
          sx={{ m: 1}}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <AccountCircle/>
              </InputAdornment>,
            },
          }}
        />

        <TextField
          {...register('lastName')}
          label="Last Name"
          sx={{ m: 1}}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <AccountCircle/>
              </InputAdornment>,
            },
          }}
        />

        <TextField
          {...register('userName')}
          label="User Name"
          sx={{ m: 1}}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <AccountCircle/>
              </InputAdornment>,
            },
          }}
        />

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

        <TextField
          {...register('confirmPassword')}
          label="Confirm Password"
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

        <TextField
          {...register('birthOfDate')}
          label="birth Of Date"
          type='date'
          sx={{ m: 1}}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <DateRangeIcon/>
              </InputAdornment>,
            },
          }}
        />
        <Button variant='outlined' type='submit'> Register </Button>
        </Box>
  )
}
