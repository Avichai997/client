import { useState, useEffect } from 'react';
import { CircularProgress, Backdrop, Typography } from '@mui/material';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

const Loading = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const display = isFetching || isMutating ? true : false;

  useEffect(() => {
    if (display) setOpen(true);
    else setOpen(false);
  }, [display]);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: 9999, display: 'flex' }}
        open={open}
        onClick={handleClose}
      >
        <Typography
          sx={{
            display: 'flex',
            position: 'fixed',
            zIndex: '9999',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          טוען
        </Typography>
        <CircularProgress
          color="inherit"
          sx={{
            background: 'rgba(0,0,0,0.5)',
            borderRadius: '50%',
          }}
        />
      </Backdrop>
    </>
  );
};

export default Loading;
