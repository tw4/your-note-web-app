import Layout from '@/layout/Layout';
import {
  Box,
  Stack,
  TextField,
  Typography,
  Checkbox,
  Link,
  Alert,
  AlertTitle,
} from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { ZodUserRegisterValidationSchema } from '@/zod/ZodValidationSchema';
import { LoadingButton } from '@mui/lab/';
import Diolog from '@/components/Diolog';
import { useRouter } from 'next/router';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState<string>();
  const [checked, setChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [diologIsOpen, setDiologIsOpen] = useState<boolean>(false);

  const route = useRouter();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const diologHandler = () => {
    if (diologIsOpen) {
      setDiologIsOpen(false);
      route.push('/login');
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (checked) {
      if (ZodUserRegisterValidationSchema.safeParse(formData).success) {
        setFormError(undefined);
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.API_KEY!,
          },
          body: JSON.stringify(formData),
        });
        if (res.status === 200) {
          setDiologIsOpen(true);
        } else if (res.status === 400) {
          setFormError('email already exists');
        } else {
          setFormError('Something went wrong');
        }
      } else {
        setFormError('Please fill out all fields');
      }
    } else {
      setFormError('Please agree to the terms and conditions');
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
          <Stack direction="column" spacing={2} padding="5%">
            <Typography variant="h3" textAlign="center">
              Sign up
            </Typography>
            <TextField
              onChange={changeHandler}
              value={formData.name}
              color={formError ? 'error' : 'primary'}
              variant="outlined"
              required={true}
              label="name"
              type="text"
              name="name"
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
            <Typography>
              <Checkbox
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
                sx={{
                  color: formError ? 'error.main' : 'rgba(255, 255, 255, 0.3)',
                }}
              />
              <Link href="/cookiepolicy">Cookie Policy</Link>,
              <Link href="/privacypolicy">Privacy Policy</Link>,
              <Link href="/eula">EULA</Link>, I agree to the terms and
              conditions
            </Typography>
            {formError ? (
              <Alert severity="error" variant="filled">
                <AlertTitle>Error</AlertTitle>
                {formError}
              </Alert>
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
            <Diolog
              isOpen={diologIsOpen}
              buttonHandler={diologHandler}
              title="User Registration Successful"
              description="Congratulations! Your registration has been successfully completed. To log in, you need to confirm your email address. Please check your inbox and follow the instructions provided in the confirmation email."
            />
          </Stack>
        </Box>
      </Stack>
    </Layout>
  );
};

export default Signup;
