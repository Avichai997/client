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
          // opacity: '0.1 !important'
        }}
        // open={!!(isFetching || isMutating)}
        open={true}
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
            background: '#7451f8c2',
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
