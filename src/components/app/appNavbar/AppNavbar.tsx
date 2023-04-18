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
import { useRouter } from 'next/router';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

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
        <IconButton
          onClick={menuHandler}
          sx={{
            color: 'white',
          }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={menuIsOpen}
          onClose={menuCloseHandler}
          sx={{
            '& .MuiPaper-root': {
              backgroundColor: 'background.paper',
            },
          }}
        >
          <MenuList>
            <MenuItem>
              <ListItem>
                <ListItemIcon>
                  <SettingsIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </MenuItem>
            <MenuItem onClick={logoutHandler}>
              <ListItem>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Stack>
  );
};

export default AppNavbar;
