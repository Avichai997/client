import { Route, Routes } from 'react-router-dom';
import Loading from 'components/Loading';
import Carousel from 'pages/Carousel';
import Login from 'pages/Login';
import NoMatch from 'pages/NoMatch';

import Admin from 'pages/Admin';
import Update from 'pages/Update';
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
          <Route path='update/:collection' element={<Update />} />
        </Route>

        <Route path='*' element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
