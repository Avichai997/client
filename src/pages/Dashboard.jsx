import Widget from 'components/Widget';
import {
  PersonOutline,
  Dashboard as DashboardIcon,
  People,
} from '@mui/icons-material';
import './Dashboard.scss';
import Chart from 'components/Chart';

const Dashboard = () => {
  return (
    <>
      <div className='widgets'>
        <Widget
          title='משתמשים'
          linkTitle='צפה בכל המשתמשים'
          path='update/users'
          count={225}
          icon={
            <PersonOutline
              className='icon'
              style={{ color: 'crimson', backgroundColor: 'rgba(255,0,0,0.2)' }}
            />
          }
        />
        <Widget
          title='דשבורדים'
          linkTitle='צפה בכל הדשבורדים'
          path='update/dashboards'
          count={149}
          icon={
            <DashboardIcon
              className='icon'
              style={{
                color: 'var(--shual)',
                backgroundColor: 'rgb(0,171,255,0.3)',
              }}
            />
          }
        />
        <Widget
          title='סוגי משתמשים'
          linkTitle='צפה בכל סוגי המשתמשים'
          path='update/types'
          count={78}
          icon={
            <People
              className='icon'
              style={{ color: 'green', backgroundColor: 'rgba(0,128,0,0.2)' }}
            />
          }
        />
      </div>

      <div className='charts'>
        <Chart />
        <Widget
          title='סוגי משתמשים'
          linkTitle='צפה בכל סוגי המשתמשים'
          path='update/types'
          count={78}
          icon={
            <People
              className='icon'
              style={{ color: 'green', backgroundColor: 'rgba(0,128,0,0.2)' }}
            />
          }
        />
      </div>
    </>
  );
};

export default Dashboard;
