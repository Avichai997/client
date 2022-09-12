// import {  useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CircularProgress, Backdrop, Typography } from '@mui/material';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

const Loading = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  return ReactDOM.createPortal(
    <>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: 9999,
          background: 'transparent',
          display: 'flex',
        }}
        open={!!(isFetching || isMutating)}
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
          color='inherit'
          sx={{
            background: '#9e9e9e',
            borderRadius: '50%',
            padding: '5px',
            height: '55px !important',
            width: '55px !important'
          }}
        />
      </Backdrop>
    </>,
    document.getElementById('loadingPortal')
  );
};

export default Loading;
