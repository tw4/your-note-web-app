import Layout from '@/layout/Layout';
import {
  Alert,
  AlertTitle,
  Box,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { ZodUserLoginValidationSchema } from '@/zod/ZodValidationSchema';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import { authControl } from '@/auth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    authControl(localStorage.getItem('token')!).then(res =>
      res ? router.push('/app') : null
    );
  }, []);

  const submitHandler = async () => {
    setIsLoading(true);
    if (ZodUserLoginValidationSchema.safeParse(formData).success) {
      setFormError(undefined);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.API_KEY!,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.status === 200) {
        //TODO update user last login
        localStorage.setItem('token', data.token);
        router.push('/app');
      } else if (res.status === 401) {
        setFormError(
          "You haven't verified your email address. Please verify your email address and try to log in again."
        );
      } else {
        setFormError('Email or password is incorrect');
      }
    } else {
      setFormError('Invalid email or password');
    }
    setIsLoading(false);
  };
  return (
    <Layout isLogin={isLoading}>
      <Stack direction="column" alignItems="center" justifyContent="center">
        <Box
          sx={{
            width: { xs: '90%', md: '50%' },
            marginTop: { xs: '20%', md: '10%' },
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: 8,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <Stack direction="column" spacing={2} padding="5%">
            <Typography variant="h3" textAlign="center">
              Login
            </Typography>
            <TextField
              onChange={changeHandler}
              value={formData.email}
              color={formError ? 'error' : 'primary'}
              variant="outlined"
              required={true}
              label="email"
              type="email"
              name="email"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: formError
                      ? 'error.main'
                      : 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'secondary.main',
                  },
                },
              }}
            />
            <TextField
              onChange={changeHandler}
              value={formData.password}
              color={formError ? 'error' : 'primary'}
              variant="outlined"
              required
              label="password"
              type="password"
              name="password"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: formError
                      ? 'error.main'
                      : 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'secondary.main',
                  },
                },
              }}
            />
            {formError ? (
              <Alert severity="error" variant="filled">
                <AlertTitle>Error</AlertTitle>
                {formError}
              </Alert>
            ) : null}
            <LoadingButton
              loading={isLoading}
              loadingPosition="start"
              onClick={submitHandler}
              type="submit"
              variant="contained"
              sx={{
                '&.Mui-disabled': {
                  color: 'darkgrey',
                },
              }}
            >
              Login
            </LoadingButton>
          </Stack>
        </Box>
      </Stack>
    </Layout>
  );
};

export default Login;
