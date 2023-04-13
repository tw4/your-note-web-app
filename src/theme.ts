import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#3A3AF4',
    },
    secondary: {
      main: '#312EB5',
    },
  },
  typography: {
    allVariants: {
      color: 'white',
    },
  },
});

export default Theme;
