import { KeyboardArrowUp, PersonOutline } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import './Widget.scss';

const Widget = ({ title, linkTitle, path, count, icon }) => {
  return (
    <div className='widget'>
      <div className='left'>
        <span className='title'>{title}</span>
        <span className='counter'>{count}</span>
        <NavLink to={path} className='link'>
          {linkTitle}
        </NavLink>
      </div>
      <div className='right'>
        <div className='percentage positive'>
          <KeyboardArrowUp />
          20%
        </div>
        
        {icon}
      </div>
    </div>
  );
};

export default Widget;
