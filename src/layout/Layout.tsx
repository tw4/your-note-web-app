import type { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

type IProps = {
  children?: ReactNode;
};

const Layout: FC<IProps> = ({ children }) => {
  return (
    <Box zIndex="1">
      <Navbar />
      <Box>{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;
