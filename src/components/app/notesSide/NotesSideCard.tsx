import { Box, CardContent, Typography } from '@mui/material';

const NotesSideCard = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'secondary.main',
        borderRadius: '5px',
        '& :hover': {
          background: '#1A1A1A',
          cursor: 'pointer',
        },
      }}
    >
      <CardContent>
        <Typography fontSize="large">Card Title</Typography>
        <Typography marginTop="2.5%" color="lightgray">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, quod.
        </Typography>
        <Typography marginTop="2.5%" color="lightgray">
          01/01/2077
        </Typography>
      </CardContent>
    </Box>
  );
};

export default NotesSideCard;
