import './Navbar.scss';
import {
  AccountCircle,
  ChatBubbleOutlined,
  DarkModeOutlined,
  FullscreenExitOutlined,
  LanguageOutlined,
  ListOutlined,
  Logout,
  NotificationsNoneOutlined,
  Settings,
} from '@mui/icons-material';
import { useUser } from 'hooks/useUser';
import { NavLink, useNavigate } from 'react-router-dom';
import Dropdown from 'components/Dropdown';
import { useAuth } from 'hooks/useAuth';

const Navbar = () => {
  const { user } = useUser();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const userMenuItems = [
    {
      icon: AccountCircle,
      title: 'פרופיל',
      onClick: () => navigate('/Profile'),
    },
    {
      divider: true,
    },
    {
      icon: Settings,
      title: 'הגדרות',
      onClick: () => navigate('/Settings'),
    },
    {
      icon: Logout,
      title: 'התנתק',
      onClick: () => logout(),
    },
  ];

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

          <Dropdown
            items={userMenuItems}
            alt={user.name}
            avatarImageSrc={`${process.env.REACT_APP_API_URL}/img/users/${user.photo}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
