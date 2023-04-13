import { Box } from '@mui/material';

const BackgroundCircle = () => {
  return (
    <Box
      position="absolute"
      height="35vh"
      width="70vw"
      borderRadius="100%"
      sx={{
        filter: 'blur(40px)',
        backgroundColor: '#3A3AF4',
        top: '-17vh',
        left: '15vw',
        opacity: 0.3,
      }}
      zIndex="-1"
    ></Box>
  );
};

export default BackgroundCircle;
