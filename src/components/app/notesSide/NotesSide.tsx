import { IconButton, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import NotesSideCard from '@/components/app/notesSide/NotesSideCard';

const NotesSide = () => {
  const [searchActive, setSearchActive] = useState<boolean>(false);

  const searchActiveHandler = () => {
    if (searchActive) {
      setSearchActive(false);
    } else {
      setSearchActive(true);
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
          Personal
        </Typography>
        <IconButton onClick={searchActiveHandler} sx={{ color: 'white' }}>
          <SearchIcon />
        </IconButton>
      </Stack>
      <TextField
        variant="standard"
        label="Search"
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
      <Stack
        spacing={2}
        direction="column"
        sx={{
          mt: '2.5%',
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
        <NotesSideCard />
      </Stack>
    </Stack>
  );
};

export default NotesSide;
