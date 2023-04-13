import type { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import Navbar from '@/components/navbar/Navbar';

type IProps = {
  children?: ReactNode;
};

const Layout: FC<IProps> = ({ children }) => {
  return (
    <Box zIndex="1">
      <Navbar />
      <Box>{children}</Box>
    </Box>
  );
};

export default Layout;
