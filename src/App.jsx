import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from 'components/Loading';
import Carousel from 'pages/Carousel';
import Login from 'pages/Login';
import NoMatch from 'pages/NoMatch';
import { useUser } from './hooks/useUser';
import ProtectRoute from 'components/ProtectRoute';
import ProtectedRoute from 'components/ProtectRoute';

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );

const Admin = Loadable(lazy(() => import('pages/Admin')));
const Dashboard = Loadable(lazy(() => import('pages/Dashboard')));
const Update = Loadable(lazy(() => import('pages/Update')));

function App() {
  const { user, csrfToken } = useUser();

  return (
    <>
      <Loading />
      <Routes>
        <Route path='/' element={<Carousel />} />
        <Route path='/Login' element={<Login />} />

        <Route
          path='/Admin/'
          element={
            <ProtectRoute>
              <Admin />
            </ProtectRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path='update/:collection' element={<Update />} />
        </Route>

        <Route path='*' element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
