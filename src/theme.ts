import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    background: {
      default: '#1A1A1A',
      paper: '#202020',
    },
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
