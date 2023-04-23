import { Box, CardContent, Typography } from '@mui/material';
import { FC } from 'react';

type IProps = {
  title: string;
  content: string;
  createdAt: string;
};

const NotesSideCard: FC<IProps> = ({ title, content, createdAt }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'secondary.main',
        borderRadius: '5px',
        '& :hover': {
          background: '#1A1A1A',
          cursor: 'pointer',
        },
      }}
    >
      <CardContent>
        <Typography fontSize="large">{title.slice(0, 30)}</Typography>
        <Typography marginTop="2.5%" color="lightgray">
          {content.slice(0, 100)}
        </Typography>
        <Typography marginTop="2.5%" color="grey">
          {createdAt}
        </Typography>
      </CardContent>
    </Box>
  );
};

export default NotesSideCard;
