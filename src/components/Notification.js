import React, { useEffect } from 'react';
import { Snackbar, SnackbarContent } from '@mui/material';

const Notification = ({ message, open, onClose }) => {
  
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        onClose();
      }, 3000); // Auto-dismiss after 3 seconds
    }
  }, [open, onClose]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <SnackbarContent
        sx={{
          backgroundColor: 'green', // You can use any color here
          color: 'white',
          fontSize: '16px',
        }}
        message={message}
      />
    </Snackbar>
  );
};

export default Notification;
