import { Outlet } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar/Sidebar';
import './Admin.scss';

const Admin = () => {
  return (
    <>
      <div className='admin_wrapper'>
        <Sidebar />
        <div className='container'>
          <Navbar />
          <div className="screenContainer">
          <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
