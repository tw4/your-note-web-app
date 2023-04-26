import type { FC, ReactNode } from 'react';
import { Box, Backdrop, CircularProgress } from '@mui/material';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

type IProps = {
  children?: ReactNode;
  isLogin?: boolean;
};

const Layout: FC<IProps> = ({ children, isLogin = true }) => {
  return (
    <Box zIndex="1">
      {isLogin ? (
        <>
          <Navbar />
          <Box>{children}</Box>
          <Footer />
        </>
      ) : (
        <>
          <Backdrop open={!isLogin} sx={{ color: '#fff' }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      )}
    </Box>
  );
};

export default Layout;
