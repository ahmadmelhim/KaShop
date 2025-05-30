import { Box, Button, InputAdornment, TextField } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import React from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const {register, handleSubmit} = useForm();
  const navigate = useNavigate();

  const forgot = async (values) => {
    try {
      const response = await axios.post(`http://mytshop.runasp.net/api/Account/ForgotPassword`, values);
      console.log(response);
      navigate('/sendcode');
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert('حدث خطأ، تأكد من صحة البيانات');
    }
  }

  return (
    <Box component={'form'} onSubmit={handleSubmit(forgot)}> 
        <TextField
          {...register('email')}
          label="Email"
          type='email'
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <EmailIcon/>
              </InputAdornment>,
            },
          }}
        />
        <Button variant='outlined' type='submit'>submit</Button>
    </Box>
  )
}
