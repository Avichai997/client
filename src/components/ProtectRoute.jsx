import { useUser } from 'hooks/useUser';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectRoute = ({ children }) => {
  const { user } = useUser();
  const location = useLocation();

  return user ? children : <Navigate to='/login' state={{path: location.pathname}}/>;
};

export default ProtectRoute;
