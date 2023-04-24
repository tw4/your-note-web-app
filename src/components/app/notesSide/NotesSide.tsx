import { Box, IconButton, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import NotesSideCard from '@/components/app/notesSide/NotesSideCard';
import { FC } from 'react';
import { Note } from '@/types';
import CloseIcon from '@mui/icons-material/Close';

type IProps = {
  getNoteDetail: (note: Note) => void;
  selectedCategory: string | null;
  noteList: Note[];
  getSelectedCategory: (category: string | null) => void;
};

const NotesSide: FC<IProps> = ({
  getNoteDetail,
  selectedCategory,
  noteList,
  getSelectedCategory,
}) => {
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>();
  const [filteredList, setFilteredList] = useState<Note[]>(noteList);

  const searchActiveHandler = () => {
    setSearchActive(!searchActive);
  };

  const searchHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearchValue(e.target.value);
    if (searchActive && e.target.value) {
      const newNoteList = noteList.filter((note: Note) => {
        if (
          note.title.toLowerCase().includes(searchValue?.toLowerCase() || '')
        ) {
          return note;
        }
      });
      setFilteredList(newNoteList);
    } else {
      setFilteredList(noteList);
    }
  };

  return (
    <Stack
      direction="column"
      bgcolor="background.paper"
      width="20vw"
      paddingLeft="1.5%"
      paddingRight="1.5%"
      paddingTop="1.5%"
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography textAlign="start" fontSize="x-large">
          {selectedCategory === null ? 'No Folder selected' : selectedCategory}
        </Typography>
        <IconButton
          onClick={() => getSelectedCategory(null)}
          sx={{ color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <Stack direction="row" justifyContent="end" marginTop="5%">
        <TextField
          fullWidth={true}
          variant="standard"
          label="Search"
          value={searchValue}
          onChange={searchHandler}
          sx={{
            visibility: searchActive ? 'visible' : 'hidden',
            '& label': {
              color: 'white',
            },
            '& input': {
              color: 'white',
            },
            '& label.Mui-focused': {
              color: 'white',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: 'white',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
          }}
        />
        <IconButton onClick={searchActiveHandler} sx={{ color: 'white' }}>
          <SearchIcon />
        </IconButton>
      </Stack>
      <Stack
        spacing={2}
        direction="column"
        sx={{
          mt: '5%',
          overflow: 'scroll',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: '8px',
            backgroundColor: 'background.paper',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '8px',
            backgroundColor: '#7f7f7f',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
          '&::-webkit-scrollbar-track': {
            borderRadius: '8px',
            backgroundColor: 'secondary',
          },
        }}
      >
        {filteredList.map(note => {
          if (note.category === selectedCategory) {
            return (
              <Box onClick={() => getNoteDetail(note)}>
                <NotesSideCard
                  title={note.title}
                  content={note.content}
                  createdAt={note.createdAt}
                />
              </Box>
            );
          }
        })}
      </Stack>
    </Stack>
  );
};

export default NotesSide;
