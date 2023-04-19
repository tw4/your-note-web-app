import {
  Stack,
  Typography,
  Button,
  Box,
  TextField,
  TextareaAutosize,
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  Divider,
  Tooltip,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ReactMarkdown from 'react-markdown';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { FC } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Note } from '@/types';
import { addNote, deleteNote } from '@/api';

type IProps = {
  noteDetail: Note;
};

const CreateNote: FC<IProps> = ({ noteDetail }) => {
  const [title, setTitle] = useState<string>(noteDetail.title);
  const [content, setContent] = useState<string>(noteDetail.content);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [date, setDate] = useState<string>(noteDetail.createdAt);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>(noteDetail.category);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const contentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const menuHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(e.currentTarget);
    setIsOpenMenu(true);
  };

  const menuCloseHandler = () => {
    setMenuAnchorEl(null);
    setIsOpenMenu(false);
  };

  const menuOptionsHandler = (selection: string) => {
    switch (selection) {
      case 'edit':
        setIsEdit(true);
        break;
      case 'save':
        setIsEdit(false);
        OnSubmitNote();
        break;
      case 'delete':
        setIsEdit(false);
        onDeleteNote();
        break;
    }
    menuCloseHandler();
  };

  const OnSubmitNote = async () => {
    setIsLoading(true);
    const newNote: Note = {
      id: noteDetail.id,
      title: title,
      content: content,
      category: folderName,
      createdBy: '',
      createdAt: noteDetail.createdAt,
      updatedAt: '',
    };
    await addNote(localStorage.getItem('token')!, newNote)
      .then(res => {
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
    window.location.reload();
    setIsLoading(false);
  };

  const onDeleteNote = async () => {
    setIsLoading(true);
    deleteNote(localStorage.getItem('token')!, noteDetail.id)
      .then(res => {
        window.location.reload();
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
  };

  return (
    <Stack
      marginLeft="1.5%"
      marginRight="1.5%"
      width="60vw"
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
      <Backdrop open={isLoading} sx={{ color: '#fff', zIndex: '2' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Stack
        direction="row"
        justifyContent="space-between"
        paddingRight="1%"
        marginTop="2%"
      >
        {isEdit ? (
          <TextField
            value={title}
            onChange={e => setTitle(e.target.value.slice(0, 50))}
            variant="standard"
            label="Title"
            sx={{
              '& label': {
                color: 'white',
              },
              '& input': {
                color: 'white',
                fontSize: 'x-large',
              },
              '& label.Mui-focused': {
                color: 'white',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'white',
                color: 'white',
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
        ) : (
          <Typography fontSize="xx-large">{title.slice(0, 50)}</Typography>
        )}
        <Button
          onClick={menuHandler}
          startIcon={<ExpandCircleDownOutlinedIcon />}
          variant="contained"
          color="secondary"
        >
          options
        </Button>
        <Menu
          open={isOpenMenu}
          anchorEl={menuAnchorEl}
          onClose={menuCloseHandler}
        >
          <MenuList>
            <MenuItem onClick={() => menuOptionsHandler('edit')}>
              <ListItemIcon>
                <EditIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <Typography>Edit</Typography>
            </MenuItem>
            <MenuItem onClick={() => menuOptionsHandler('save')}>
              <ListItemIcon>
                <SaveIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <Typography>Save</Typography>
            </MenuItem>
            <Divider style={{ backgroundColor: 'grey' }} />
            <MenuItem onClick={() => menuOptionsHandler('delete')}>
              <ListItemIcon>
                <DeleteForeverIcon color="error" />
              </ListItemIcon>
              <Typography color="error.main">Delete</Typography>
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
      <Stack direction="row" alignItems="center" marginTop="2.5%" spacing={2}>
        <DateRangeIcon fontSize="small" sx={{ color: 'white' }} />
        <Typography sx={{ fontSize: 'large' }}>{date}</Typography>
        <Tooltip title="Creation date of the note">
          <InfoOutlinedIcon style={{ color: 'white', cursor: 'pointer' }} />
        </Tooltip>
      </Stack>
      <Divider style={{ backgroundColor: 'grey', marginTop: '2.5%' }} />
      {isEdit ? (
        <Stack direction="row">
          <TextField
            variant="standard"
            label="Folder name"
            value={folderName}
            onChange={e => setFolderName(e.target.value.slice(0, 20))}
            sx={{
              mt: '2.5%',
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
        </Stack>
      ) : (
        <Typography sx={{ mt: '2.5%' }}>{noteDetail.category}</Typography>
      )}
      <Divider style={{ backgroundColor: 'grey', marginTop: '2.5%' }} />
      {isEdit ? (
        <TextareaAutosize
          placeholder="type here..."
          minRows={3}
          onChange={contentChangeHandler}
          value={content}
          style={{
            backgroundColor: 'transparent',
            color: 'white',
            fontSize: 'x-large',
            height: '90vh',
            marginTop: '2.5%',
            outline: 'none',
          }}
        />
      ) : (
        <Box color="white">
          <ReactMarkdown children={content} />
        </Box>
      )}
    </Stack>
  );
};

export default CreateNote;
