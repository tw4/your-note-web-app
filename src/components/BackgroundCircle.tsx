import { Box } from '@mui/material';

const BackgroundCircle = () => {
  return (
    <Box
      position="absolute"
      height="50vh"
      width="100vh"
      borderRadius="100%"
      sx={{
        backgroundColor: '#3A3AF4',
        boxShadow: '0 0 150px 130px #3A3AF4 ',
        top: '-40vh',
        left: '25vw',
        opacity: 0.3,
      }}
      zIndex="-1"
    ></Box>
  );
};

export default BackgroundCircle;
