import {
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Box,
  MenuList,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { User } from '@/types';
import { getUserData } from '@/api';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { router } from 'next/client';
import { useRouter } from 'next/router';
import LogoutIcon from '@mui/icons-material/Logout';

const AppNavbar = () => {
  const [user, setUser] = useState<User>();
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const router = useRouter();

  useEffect(() => {
    getUserData(localStorage.getItem('token')!).then(res => {
      setUser(res.user);
    });
  }, []);

  const menuHandler = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuIsOpen(true);
  };

  const menuCloseHandler = () => {
    setMenuAnchorEl(null);
    setMenuIsOpen(false);
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <Stack
      direction="row"
      justifyContent="end"
      marginLeft="2.5%"
      marginRight="2.5%"
    >
      <Box>
        <IconButton color="primary" onClick={menuHandler}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={menuIsOpen}
          onClose={menuCloseHandler}
          sx={{
            '& .MuiPaper-root': {
              backgroundColor: 'primary.main',
            },
          }}
        >
          <MenuList>
            <MenuItem onClick={logoutHandler}>
              <LogoutIcon /> <ListItemText primary="Logout" />
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Stack>
  );
};

export default AppNavbar;
