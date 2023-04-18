import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import AppNavbar from '@/components/app/appNavbar/AppNavbar';

type IProps = {
  children?: ReactNode;
};

const AppLayout: FC<IProps> = ({ children }) => {
  return (
    <Box>
      <AppNavbar />
      <Box>{children}</Box>
    </Box>
  );
};

export default AppLayout;
