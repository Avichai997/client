import { useState } from 'react';
import { Logout, AccountBox } from '@mui/icons-material';

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
import { useAuth } from './../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Dropdown = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = [
    {
      icon: AccountBox,
      title: 'פרופיל',
      onClick: () => navigate('/Profile'),
    },
    {
      icon: Logout,
      title: 'התנתק',
      onClick: () => logout(),
    },
  ];

  return (
    <RtlProvider>
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
        {options.map((option, index) => {
          const Icon = option.icon;
          return (
            <MenuItem onClick={option.onClick} key={index}>
              <ListItemIcon>
                <Icon fontSize='small' />
              </ListItemIcon>
              <ListItemText>{option.title}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </RtlProvider>
  );
};
export default Dropdown;
