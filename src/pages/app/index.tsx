import {
  Box,
  Typography,
  CircularProgress,
  Backdrop,
  Stack,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import { authControl } from '@/auth';
import { getUserData } from '@/api';
import AppLayout from '@/layout/AppLayout';
import AppSideBar from '@/components/app/AppSideBar';
import NotesSide from '@/components/app/notesSide/NotesSide';
import CreateNote from '@/components/app/CreateNote';

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
          <Stack direction="row" height="95vh">
            <AppSideBar />
            <NotesSide />
            <CreateNote />
          </Stack>
        </AppLayout>
      )}
    </Box>
  );
};

export default NotesApp;
