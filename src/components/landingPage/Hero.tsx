import { Typography, Box, Button } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Hero = () => {
  return (
    <Box textAlign="center">
      <Typography
        fontSize={{ xs: 'x-large', md: 'xxx-large' }}
        sx={{
          marginTop: { xs: '20%', md: '8%' },
          marginLeft: { xs: '10%', md: '20%' },
          marginRight: { xs: '10%', md: '20%' },
        }}
      >
        Maximize your efficiency with our efficient and user-friendly
        note-taking solution.
      </Typography>
      <Typography
        fontSize={{ xs: 'small', md: 'x-large' }}
        sx={{
          marginTop: { xs: '5%', md: '2.5%' },
          marginLeft: { xs: '10%', md: '25%' },
          marginRight: { xs: '10%', md: '25%' },
          opacity: 0.7,
        }}
      >
        Enjoy easy access to your notes across all your devices with our
        user-friendly cloud-based platform.
      </Typography>
      <Button
        variant="contained"
        endIcon={<KeyboardArrowRightIcon />}
        sx={{
          marginTop: { xs: '20%', md: '5%' },
          marginLeft: { xs: '10%', md: '20%' },
          marginRight: { xs: '10%', md: '20%' },
        }}
      >
        Try For Free
      </Button>
    </Box>
  );
};

export default Hero;
