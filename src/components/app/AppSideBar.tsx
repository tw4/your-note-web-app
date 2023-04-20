import {
  Button,
  ListItemIcon,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FC } from 'react';
import { Note } from '@/types';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';

type IProps = {
  getNoteDetail: (note: Note) => void;
  getSelectedCategory: (category: string) => void;
  selectedCategory: string | null;
  categoryList: string[];
};

const AppSideBar: FC<IProps> = ({
  getNoteDetail,
  getSelectedCategory,
  selectedCategory,
  categoryList,
}) => {
  const newNote: Note = {
    id: '',
    title: 'New Note',
    content: 'New note content',
    createdBy: '',
    createdAt: `${new Date().toLocaleDateString('en-GB')}`,
    updatedAt: '',
    category: 'New Folder',
  };

  return (
    <Stack direction="column" marginLeft="1.5%" marginRight="1.5%" width="20vw">
      <Typography textAlign="start" fontSize="x-large">
        Notes
      </Typography>
      <Button
        onClick={() => getNoteDetail(newNote)}
        variant="contained"
        color="secondary"
        startIcon={<AddIcon />}
        sx={{ mt: '5%' }}
      >
        New Note
      </Button>
      <Stack
        direction="column"
        marginTop="5%"
        height="25vh"
        sx={{
          overflow: 'scroll',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: '8px',
            backgroundColor: 'background.paper',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '8px',
            backgroundColor: '#7f7f7f',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
          '&::-webkit-scrollbar-track': {
            borderRadius: '8px',
            backgroundColor: 'secondary',
          },
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography color="grey">Folders</Typography>
          <FolderOpenOutlinedIcon sx={{ color: 'grey' }} />
        </Stack>
        <MenuList>
          {categoryList.map(category => {
            return (
              <MenuItem onClick={() => getSelectedCategory(category)}>
                <ListItemIcon>
                  <FolderOpenOutlinedIcon
                    sx={{
                      color: selectedCategory === category ? 'white' : 'grey',
                    }}
                  />
                </ListItemIcon>
                <Typography
                  color={selectedCategory === category ? 'white' : 'grey'}
                >
                  {category.slice(0, 20)}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Stack>
    </Stack>
  );
};

export default AppSideBar;
