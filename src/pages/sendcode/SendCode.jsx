import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SendCode() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();  // <=== مهم

  const ResetPassword = async (values) => {
    if (values.password !== values.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.patch(
        `http://mytshop.runasp.net/api/Account/SendCode`,
        values
      );
      alert("Password reset successful.");
      navigate('/');
    } catch (error) {
      alert("Password reset failed.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(ResetPassword)}>
      <TextField
        {...register('email')}
        label="Email"
        type="email"
        sx={{ m: 1 }}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        {...register('code')}
        label="Code"
        type="number"
        sx={{ m: 1 }}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        {...register('password')}
        label="Password"
        type="password"
        sx={{ m: 1 }}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PasswordIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        {...register('confirmPassword')}
        label="Confirm Password"
        type="password"
        sx={{ m: 1 }}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PasswordIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button variant="outlined" type="submit">Reset Password</Button>
    </Box>
  );
}
