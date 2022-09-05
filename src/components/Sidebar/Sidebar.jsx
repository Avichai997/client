import './Sidebar.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SidebarMenu from 'components/Sidebar/SidebarMenu';
import {
  House,
  Person,
  Menu,
  Search,
  AppRegistration,
  People,
  Dashboard,
  SupportAgent,
} from '@mui/icons-material';

const routes = [
  {
    path: '', // default path
    name: ' Dashboard',
    icon: <House />,
  },
  {
    path: 'update',
    name: 'ערוך מידע',
    icon: <AppRegistration />,
    subRoutes: [
      {
        path: 'update/dashboards',
        name: 'דשבורדים',
        icon: <Dashboard />,
      },
      {
        path: 'update/types',
        name: 'לקוחות',
        icon: <SupportAgent />,
      },
      {
        path: 'update/customers',
        name: 'סוגי לקוחות',
        icon: <People />,
      },
      {
        path: 'update/users',
        name: 'משתמשים',
        icon: <Person />,
      },
    ],
  },
  // {
  //   path: 'users',
  //   name: 'Users',
  //   icon: <Person />,
  // },
  // {
  //   path: 'messages',
  //   name: 'Messages',
  //   icon: <Message />,
  // },
  // {
  //   path: 'analytics',
  //   name: 'Analytics',
  //   icon: <Analytics />,
  // },
  // {
  //   path: 'order',
  //   name: 'Order',
  //   icon: <ShoppingCart />,
  // },
  // {
  //   path: 'settings',
  //   name: 'Settings',
  //   icon: <SettingsOutlined />,
  //   exact: true,
  //   subRoutes: [
  //     {
  //       path: 'settings/profile',
  //       name: 'Profile ',
  //       icon: <Person />,
  //     },
  //     {
  //       path: 'settings/2fa',
  //       name: '2FA',
  //       icon: <Lock />,
  //     },
  //     {
  //       path: 'settings/billing',
  //       name: 'Billing',
  //       icon: <AttachMoney />,
  //     },
  //   ],
  // },
  // {
  //   path: 'saved',
  //   name: 'Saved',
  //   icon: <Favorite />,
  // },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: '140px',
      padding: '5px 15px',
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: 'auto',
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <motion.div
        animate={{
          width: isOpen ? '200px' : '45px',
          transition: {
            duration: 0.5,
            type: 'spring',
            damping: 10,
          },
        }}
        className={`Sidebar `}
      >
        <div className='top_section'>
          <AnimatePresence>
            {isOpen && (
              <motion.h1
                variants={showAnimation}
                initial='hidden'
                animate='show'
                exit='hidden'
                className='logo'
              >
                Admin Panel
              </motion.h1>
            )}
          </AnimatePresence>
          <Menu onClick={toggle} className='bars' />
        </div>

        <div className='search'>
          <AnimatePresence>
            {isOpen && (
              <motion.input
                initial='hidden'
                animate='show'
                exit='hidden'
                variants={inputAnimation}
                type='text'
                placeholder='Search'
              />
            )}
          </AnimatePresence>
          <Search className='search_icon' />
        </div>

        <section className='routes'>
          {routes.map((route, index) => {
            if (route.subRoutes) {
              return (
                <SidebarMenu
                  setIsOpen={setIsOpen}
                  key={index}
                  route={route}
                  showAnimation={showAnimation}
                  isOpen={isOpen}
                />
              );
            }

            return (
              <NavLink
                end // = exact path
                to={`${route.path}`}
                key={index}
                className={({ isActive }) =>
                  'link' + (isActive ? ' active' : '')
                }
              >
                <div className='icon'>{route.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial='hidden'
                      animate='show'
                      exit='hidden'
                      className='link_text'
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </section>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={showAnimation}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='bottom'
            >
              <div className='colorOption'></div>
              <div className='colorOption'></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Sidebar;
