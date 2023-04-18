import { Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
const AppSideBar = () => {
  return (
    <Stack direction="column" marginLeft="1.5%" marginRight="1.5%" width="20vw">
      <Typography textAlign="start" fontSize="x-large">
        Notes
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<AddIcon />}
        sx={{ mt: '5%' }}
      >
        New Note
      </Button>
    </Stack>
  );
};

export default AppSideBar;
