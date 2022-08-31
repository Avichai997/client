import {
  ChatBubbleOutlined,
  DarkModeOutlined,
  FullscreenExitOutlined,
  LanguageOutlined,
  ListOutlined,
  NotificationsNoneOutlined,
} from '@mui/icons-material';
import './Navbar.scss';
import avaterPic from 'images/avichai.jpg';
import { Avatar } from '@mui/material';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='items'>
          <LanguageOutlined className='item' />
          <DarkModeOutlined className='item' />
          <FullscreenExitOutlined className='item' />
          <NotificationsNoneOutlined className='item' />
          <ChatBubbleOutlined className='item' />
          <ListOutlined className='item' />
          <Avatar alt='Remy Sharp' src={avaterPic} className='item avatar'/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
