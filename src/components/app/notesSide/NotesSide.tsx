import { IconButton, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

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
      <Stack direction="column"></Stack>
    </Stack>
  );
};

export default NotesSide;
