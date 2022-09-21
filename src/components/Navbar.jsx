import './Navbar.scss';
import {
  ChatBubbleOutlined,
  DarkModeOutlined,
  FullscreenExitOutlined,
  LanguageOutlined,
  ListOutlined,
  NotificationsNoneOutlined,
} from '@mui/icons-material';
import avaterPic from 'images/avichai.jpg';
import { Avatar } from '@mui/material';
import { useUser } from 'hooks/useUser';
import { NavLink } from 'react-router-dom';
import Dropdown from 'components/Dropdown';

const Navbar = () => {
  const { user } = useUser();

  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='items'>
          <LanguageOutlined className='item' />
          <DarkModeOutlined className='item' />
          <FullscreenExitOutlined className='item' />
          <NotificationsNoneOutlined className='item' />
          <ChatBubbleOutlined className='item' />
          {/* <ListOutlined className='item' /> */}
          <Dropdown />
          {user ? (
            <Avatar
              alt='Remy Sharp'
              src={`${process.env.REACT_APP_API_URL}/img/users/${user.photo}`}
              className='item avatar'
            />
          ) : (
            <NavLink className='item' to='/login'>
              התחבר
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
