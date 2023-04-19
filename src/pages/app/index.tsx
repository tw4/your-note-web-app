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
import AppLayout from '@/layout/AppLayout';
import AppSideBar from '@/components/app/AppSideBar';
import NotesSide from '@/components/app/notesSide/NotesSide';
import CreateNote from '@/components/app/CreateNote';
import NoteDetailLandingPage from '@/components/app/NoteDetailLandingPage';
import { Note } from '@/types';
import { getNoteList } from '@/api';

const NotesApp = () => {
  const router = useRouter();
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [noteDetail, setNoteDetail] = useState<Note | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [noteList, setNoteList] = useState<Note[]>([]);

  useEffect(() => {
    authControl(localStorage.getItem('token')!).then(res => {
      res ? setPageIsLoading(false) : router.push('/login');
    });

    getNoteList(localStorage.getItem('token')!).then(res => {
      setCategoryList(res.category);
      setNoteList(res.notes);
    });
  }, []);

  const getNoteDetail = async (note: Note) => {
    await setNoteDetail(null);
    await setNoteDetail(note);
  };

  const getSelectedCategory = async (category: string) => {
    await setSelectedCategory(category);
  };

  return (
    <Box>
      {pageIsLoading ? (
        <Backdrop sx={{ color: '#fff' }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <AppLayout>
          <Stack direction="row" height="95vh">
            <AppSideBar
              categoryList={categoryList}
              selectedCategory={selectedCategory}
              getSelectedCategory={getSelectedCategory}
              getNoteDetail={getNoteDetail}
            />
            <NotesSide
              noteList={noteList}
              selectedCategory={selectedCategory}
              getNoteDetail={getNoteDetail}
            />
            {noteDetail !== null ? (
              <CreateNote noteDetail={noteDetail} />
            ) : (
              <NoteDetailLandingPage />
            )}
          </Stack>
        </AppLayout>
      )}
    </Box>
  );
};

export default NotesApp;
