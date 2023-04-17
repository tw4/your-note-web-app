import { Box, Typography, CircularProgress, Backdrop } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import { authControl } from '@/auth';
import { getUserData } from '@/api';
import AppLayout from '@/layout/AppLayout';

const NotesApp = () => {
  const router = useRouter();
  const [pageIsLoading, setPageIsLoading] = useState(true);

  useEffect(() => {
    authControl(localStorage.getItem('token')!).then(res => {
      res ? setPageIsLoading(false) : router.push('/login');
    });
  }, []);

  return (
    <Box>
      {pageIsLoading ? (
        <Backdrop sx={{ color: '#fff' }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <AppLayout>
          <Typography>Notes App</Typography>
        </AppLayout>
      )}
    </Box>
  );
};

export default NotesApp;
