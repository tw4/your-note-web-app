import { Box, Typography, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import { authControl } from '@/auth';

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
        <CircularProgress />
      ) : (
        <Typography>Notes App</Typography>
      )}
    </Box>
  );
};

export default NotesApp;
