import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ExpandMore } from '@mui/icons-material';
import { useParams, useLocation } from 'react-router-dom';

const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.3, when: 'afterChildren' },
  },
  show: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
      when: 'beforeChildren',
    },
  },
};

const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: '100%',
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
  show: (i) => ({
    x: '-20px',
    width: 'calc(100% - 20px)',
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
};

const SidebarMenu = ({ route, showAnimation, isOpen, setIsOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const params = useParams();
  const location = useLocation();

  const { path, icon: Icon, name } = route;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };

  useEffect(() => {
    if (location.pathname.includes(route.path)) {
      setIsMenuOpen(true);
    }
  }, [location.pathname, route.path]);

  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
    }
  }, [isOpen]);

  return (
    <>
      <div className='menu' onClick={toggleMenu}>
        <div className='menu_item'>
          <Icon className='icon' />
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
        </div>
        {isOpen && (
          <motion.div
            animate={
              isMenuOpen
                ? {
                    rotate: -90,
                  }
                : { rotate: 0 }
            }
          >
            <ExpandMore />
          </motion.div>
        )}
      </div>{' '}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='menu_container'
          >
            {route.subRoutes.map(({ path, icon: Icon, name }, i) => (
              <motion.div variants={menuItemAnimation} key={path} custom={i}>
                <NavLink to={path} key={i} className='link'>
                  <Icon className='icon' />
                  <motion.div className='link_text'>{name}</motion.div>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}{' '}
      </AnimatePresence>
    </>
  );
};

export default SidebarMenu;
