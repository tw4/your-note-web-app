import { Button, Link, Stack, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useRouter } from 'next/router';
import NavbarItem from '@/components/navbar/NavbarItem';

const Navbar = () => {
  const route = useRouter();
  const currentPath = route.pathname;

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'normal', md: 'center' }}
      justifyContent="space-between"
      sx={{
        ml: { xs: '2.5%', md: '5%' },
        mr: { xs: '2.5%', md: '5%' },
        mt: { xs: '2.5%', md: '2.5%' },
      }}
    >
      {open ? (
        <CloseIcon
          onClick={handleOpen}
          fontSize="large"
          sx={{
            color: 'white',
            display: { xs: 'block', md: 'none' },
          }}
        />
      ) : (
        <MenuIcon
          onClick={handleOpen}
          fontSize="large"
          sx={{
            color: 'white',
            display: { xs: 'block', md: 'none' },
          }}
        />
      )}

      <Typography variant="h5" display={{ xs: 'none', md: 'block' }}>
        Notes
      </Typography>
      <Stack
        spacing={10}
        direction={{ xs: 'column', md: 'row' }}
        fontSize={{ xs: 'large' }}
        sx={{
          display: { xs: open ? 'flex' : 'none', md: 'flex' },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <NavbarItem
          currentPath={currentPath}
          expectedPath="/"
          content="Home"
          href="/"
        />
        <NavbarItem
          currentPath={currentPath}
          expectedPath="/product"
          content="Product"
          href="/product"
        />
        <NavbarItem
          currentPath={currentPath}
          expectedPath="/support"
          content="Support"
          href="/support"
        />
        <NavbarItem
          currentPath={currentPath}
          expectedPath="/contact"
          content="Contact Us"
          href="/contact"
        />
      </Stack>
      <Button
        href="/login"
        component={Link}
        variant="contained"
        sx={{
          display: { xs: 'none', md: 'block' },
        }}
      >
        Login
      </Button>
    </Stack>
  );
};

export default Navbar;
