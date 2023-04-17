import type { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

type IProps = {
  isOpen: boolean;
  title: string;
  description: string;
  buttonHandler: () => void;
};

const Diolog: FC<IProps> = ({ title, isOpen, description, buttonHandler }) => {
  return (
    <Dialog
      open={isOpen}
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'background.default',
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText color="white">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="success"
          onClick={buttonHandler}
          autoFocus
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Diolog;
