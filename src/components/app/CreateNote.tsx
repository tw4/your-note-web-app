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
import { addNote, deleteNote, getCategoryList } from '@/api';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import ToastMessage from '@/components/ToastMessage';
import toastMessage from '@/components/ToastMessage';
import { severityEnum } from '@/enum';
import { ZodNoteSaveValidationSchema } from '@/zod/ZodValidationSchema';
import note from '@/pages/api/note';

type IProps = {
  noteDetail: Note;
};

const CreateNote: FC<IProps> = ({ noteDetail }) => {
  const [title, setTitle] = useState<string>(noteDetail.title);
  const [content, setContent] = useState<string>(noteDetail.content);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [date, setDate] = useState<string>(noteDetail.createdAt);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>(noteDetail.category);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoryMenuAnchorEl, setCategoryMenuAnchorEl] =
    useState<HTMLElement | null>(null);
  const [isOpenCategoryMenu, setIsOpenCategoryMenu] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [isOpenToastMessage, setIsOpenToastMessage] = useState<boolean>(false);
  const [toastMessageContent, setToastMessageContent] = useState<string>('');

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

  const categoryMenuHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    getCategoryList(localStorage.getItem('token')!).then(async res => {
      await setCategoryList(res.categoryList);
    });
    await setCategoryMenuAnchorEl(e.currentTarget);
    await setIsOpenCategoryMenu(true);
  };

  const categoryMenuCloseHandler = () => {
    setIsOpenCategoryMenu(false);
    setCategoryMenuAnchorEl(null);
  };

  const categoryMenuOptionsHandler = (category: string) => {
    setFolderName(category);
    categoryMenuCloseHandler();
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

    if (ZodNoteSaveValidationSchema.safeParse(newNote).success) {
      await addNote(localStorage.getItem('token')!, newNote)
        .then(res => {
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
        });
      window.location.reload();
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setToastMessageContent(
        'Please fill in the required fields - note title, note content, and folder name.'
      );
      setIsOpenToastMessage(true);
    }
  };

  const onDeleteNote = async () => {
    setIsLoading(true);
    deleteNote(localStorage.getItem('token')!, noteDetail.id).then(res => {
      setIsLoading(false);
    });
    setIsLoading(false);
    window.location.reload();
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
      <ToastMessage
        content={toastMessageContent}
        isOpen={isOpenToastMessage}
        severity={severityEnum.error}
        setIsopen={setIsOpenToastMessage}
      />
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
        <DateRangeIcon sx={{ color: 'grey' }} />
        <Typography color="grey">Date</Typography>
        <Typography sx={{ fontSize: 'large', textDecoration: 'underline' }}>
          {date}
        </Typography>
        <Tooltip title="Creation date of the note">
          <InfoOutlinedIcon style={{ color: 'grey', cursor: 'pointer' }} />
        </Tooltip>
      </Stack>
      <Divider style={{ backgroundColor: 'grey', marginTop: '2.5%' }} />
      <Stack direction="row" alignItems="center" marginTop="2.5%" spacing={2}>
        <FolderOpenOutlinedIcon sx={{ color: 'grey' }} />
        <Typography color="grey">Folder</Typography>
        {isEdit ? (
          <>
            <TextField
              variant="standard"
              label="Folder name"
              value={folderName}
              onChange={e => setFolderName(e.target.value.slice(0, 20))}
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
            <Button
              endIcon={<ExpandCircleDownOutlinedIcon />}
              color="secondary"
              variant="contained"
              onClick={categoryMenuHandler}
            >
              Select folder
            </Button>
            <Menu
              anchorEl={categoryMenuAnchorEl}
              open={isOpenCategoryMenu}
              onClose={categoryMenuCloseHandler}
            >
              <MenuList>
                {categoryList.map(category => {
                  return (
                    <MenuItem
                      onClick={() => categoryMenuOptionsHandler(category)}
                    >
                      <Typography>{category}</Typography>
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>
          </>
        ) : (
          <Typography sx={{ textDecoration: 'underline' }}>
            {noteDetail.category}
          </Typography>
        )}
      </Stack>
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
