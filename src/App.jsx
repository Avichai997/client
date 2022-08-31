import './App.css';
import { Route, Routes } from 'react-router-dom';
import Loading from 'components/Loading';
import Carousel from 'pages/Carousel';
import Login from 'pages/Login';
import NoMatch from 'pages/NoMatch';

import Admin from 'pages/Admin';
import Users from 'pages/Users';
import Messages from 'pages/Messages';
import Analytics from 'pages/Analytics';
import Update from 'pages/Update';
import Order from 'pages/Order';
import Saved from 'pages/Saved';
import Setting from 'pages/Setting';
import Dashboard from 'pages/Dashboard';

function App() {
  return (
    <>
      <Loading />
      <Routes>
        <Route path='/' element={<Carousel />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Admin/' element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path='users' element={<Users />} />
          <Route path='update/:collection' element={<Update />} />
          <Route path='messages' element={<Messages />} />
          <Route path='analytics' element={<Analytics />} />
          <Route path='order' element={<Order />} />
          <Route path='saved' element={<Saved />} />
          <Route path='settings' element={<Setting />} />
        </Route>

        <Route path='*' element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
