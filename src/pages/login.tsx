import Layout from '@/layout/Layout';
import { Box, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { ZodUserLoginValidationSchema } from '@/zod/ZodValidationSchema';
import { LoadingButton } from '@mui/lab';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    setLoading(true);
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
      if (res.status === 200) {
        const data = await res.json();
        sessionStorage.setItem('user', JSON.stringify(data));
      } else {
        setFormError('Email or password is incorrect');
      }
    } else {
      setFormError('Invalid email or password');
    }
    setLoading(false);
  };
  return (
    <Layout>
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
          <Stack
            direction="column"
            spacing={2}
            padding="5%"
            onSubmit={() => console.log('test')}
          >
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
              <Typography color="error" variant="body1">
                {formError}
              </Typography>
            ) : null}
            <LoadingButton
              loading={loading ? true : false}
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
