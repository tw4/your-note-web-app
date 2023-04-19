import { Box, Stack, Typography } from '@mui/material';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

const NoteDetailLandingPage = () => {
  return (
    <Stack
      width="60vw"
      height="95vh"
      textAlign="center"
      justifyContent="center"
    >
      <Box>
        <InsertDriveFileOutlinedIcon
          sx={{ color: 'white', fontSize: '8rem' }}
        />
        <Typography fontSize="xx-large">Select a note to view</Typography>
        <Typography
          fontSize="large"
          color="lightgrey"
          sx={{
            mr: '20%',
            ml: '20%',
          }}
        >
          Select a note from the list on the left to view its contents, or
          create a new note to add to your collection.
        </Typography>
      </Box>
    </Stack>
  );
};

export default NoteDetailLandingPage;
