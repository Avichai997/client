// import {  useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CircularProgress, Backdrop, Typography } from '@mui/material';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

const Loading = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  // useEffect(() => {
  //   setOpen(isFetching || isMutating ? true : false);
  // }, [isFetching, isMutating]);

  // const [open, setOpen] = useState(false);
  
  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    ReactDOM.createPortal(
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: 9999, display: 'flex' }}
        open={isFetching || isMutating}
        // onClick={handleClose}
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
    </>,
    document.getElementById('loadingPortal')
    )
  );
};

export default Loading;
