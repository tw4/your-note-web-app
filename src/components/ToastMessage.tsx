import { FC } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { severityEnum } from '@/enum';

type IProps = {
  content: string;
  isOpen: boolean;
  setIsopen: (isOpen: boolean) => void;
  severity: severityEnum;
};

const ToastMessage: FC<IProps> = ({ isOpen, content, severity, setIsopen }) => {
  const closeHandler = () => {
    setIsopen(false);
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={closeHandler}
    >
      <Alert severity={severity} variant="filled" onClose={closeHandler}>
        {content}
      </Alert>
    </Snackbar>
  );
};

export default ToastMessage;
