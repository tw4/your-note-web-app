import {
  Stack,
  Typography,
  TextareaAutosize,
  Button,
  Box,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ReactMarkdown from 'react-markdown';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import DateRangeIcon from '@mui/icons-material/DateRange';

const CreateNote = () => {
  const [title, setTitle] = useState<string>('title');
  const [content, setContent] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [date, setDate] = useState<Dayjs | null>(null);

  const contentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const editHandler = () => {
    console.log(date?.format('DD/MM/YYYY'));
    if (isEdit) {
      console.log(date?.format('DD/MM/YYYY'));
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
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
      <Stack direction="row" justifyContent="space-between">
        {isEdit ? (
          <TextField
            value={title}
            onChange={e => setTitle(e.target.value)}
            variant="standard"
            label="Title"
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
          <Typography fontSize="xx-large">{title}</Typography>
        )}
        <Button
          onClick={editHandler}
          startIcon={<EditIcon />}
          variant="contained"
          color="secondary"
        >
          {isEdit ? 'Save' : 'Edit'}
        </Button>
      </Stack>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction="row" alignItems="center" spacing={2} marginTop="2.5%">
          <DateRangeIcon sx={{ color: 'white', fontSize: 'xx-large' }} />
          {isEdit ? (
            <DateField
              size="small"
              value={date}
              onChange={newValue => setDate(newValue)}
              sx={{
                '& .MuiInputBase-input': {
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
                  '& image': {
                    color: 'white',
                  },
                },
              }}
            />
          ) : (
            <Typography sx={{ fontSize: 'xx-large' }}>
              {date?.format('DD/MM/YYYY') || 'no date entered yet'}
            </Typography>
          )}
        </Stack>
      </LocalizationProvider>
      {isEdit ? (
        <TextareaAutosize
          placeholder="type here..."
          minRows={3}
          onChange={contentChangeHandler}
          value={content}
          style={{
            marginTop: '2.5%',
            backgroundColor: 'transparent',
            color: 'white',
            height: '90vh',
            fontSize: 'x-large',
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
