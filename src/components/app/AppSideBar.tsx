import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItemIcon,
  MenuItem,
  MenuList,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FC, useEffect, useState } from 'react';
import { Note } from '@/types';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import { addCategory, getCategoryList } from '@/api';
import { z } from 'zod';

type IProps = {
  getNoteDetail: (note: Note) => void;
  getSelectedCategory: (category: string) => void;
  selectedCategory: string | null;
};

const AppSideBar: FC<IProps> = ({
  getNoteDetail,
  getSelectedCategory,
  selectedCategory,
}) => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>('');
  const [categoryList, setCategoryList] = useState<string[]>([]);

  useEffect(() => {
    getCategoryList(localStorage.getItem('token')!).then(res => {
      setCategoryList(res.categoryList);
    });
  }, []);

  const newNote: Note = {
    id: '',
    title: 'New Note',
    content: 'New note content',
    createdBy: '',
    createdAt: `${new Date().toLocaleDateString('en-GB')}`,
    updatedAt: '',
    category: 'New Folder',
  };

  const dialogOpenHandler = () => {
    setNewCategory('');
    setIsOpenDialog(true);
  };

  const dialogCloseHandler = () => {
    setIsOpenDialog(false);
  };

  const onCreateFolder = () => {
    if (z.string().min(1).max(20).safeParse(newCategory).success) {
      addCategory(localStorage.getItem('token')!, newCategory).then(res => {
        setCategoryList(res.categoryList);
      });
    }
    dialogCloseHandler();
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
      <Stack direction="column" marginTop="5%" height="25vh">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography color="grey">Folders</Typography>
          <IconButton
            onClick={dialogOpenHandler}
            sx={{
              color: 'grey',
              '&:hover': {
                color: 'white',
              },
            }}
          >
            <CreateNewFolderOutlinedIcon />
          </IconButton>
          <Dialog open={isOpenDialog} onClose={dialogCloseHandler}>
            <DialogTitle>Create a Folder</DialogTitle>
            <DialogContent>
              <TextField
                label="Folder Name"
                fullWidth
                variant="standard"
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                sx={{
                  '& label': {
                    color: 'white',
                  },
                  '& input': {
                    color: 'white',
                  },
                  '& label.Mui-focused': {
                    color: 'white',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: 'white',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={dialogCloseHandler} color="error">
                Cancel
              </Button>
              <Button
                onClick={() => onCreateFolder()}
                color="secondary"
                variant="contained"
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </Stack>
        <MenuList
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
