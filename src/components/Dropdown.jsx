import { useState } from 'react';
import {
  Logout,
  AccountBox
} from '@mui/icons-material';

import {
  Divider,
  Paper,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Button,
  Menu,
} from '@mui/material';
import RtlProvider from 'utils/RtlProvider';

const Dropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <RtlProvider>
      <Paper sx={{ width: 500, maxWidth: '100%' }}>
        <Button
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Dashboard
        </Button>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          // sx={{width: '400px'}}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AccountBox fontSize='small' />
            </ListItemIcon>
            <ListItemText>פרופיל</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize='small' />
            </ListItemIcon>
            <ListItemText>התנתק</ListItemText>
          </MenuItem>
        </Menu>

        {/* <MenuList>
        <MenuItem>
        <ListItemIcon>
        <ContentCut fontSize='small' />
        </ListItemIcon>
        <ListItemText>Cut</ListItemText>
        <Typography variant='body2' color='text.secondary'>
        ⌘X
        </Typography>
        </MenuItem>
        <MenuItem>
        <ListItemIcon>
        <ContentCopy fontSize='small' />
        </ListItemIcon>
        <ListItemText>Copy</ListItemText>
        <Typography variant='body2' color='text.secondary'>
            ⌘C
          </Typography>
          </MenuItem>
          <MenuItem>
          <ListItemIcon>
          <ContentPaste fontSize='small' />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
          <Typography variant='body2' color='text.secondary'>
          ⌘V
          </Typography>
          </MenuItem>
          <Divider />
          <MenuItem>
          <ListItemIcon>
          <Cloud fontSize='small' />
          </ListItemIcon>
          <ListItemText>Web Clipboard</ListItemText>
          </MenuItem>
        </MenuList>*/}
      </Paper>
    </RtlProvider>
  );
};
export default Dropdown;
