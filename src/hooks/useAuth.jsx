import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ToastSuccess } from 'components/Toasts';
import { useLocation, useNavigate } from 'react-router-dom';

export const useAuth = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { mutate: authMutation } = useMutation();

  const getUserData = (userData) => ({
    token: userData.token,
    tokenExpiration: userData.tokenExpiration,
    id: userData.data._id,
    name: userData.data.name,
    email: userData.data.email,
    photo: userData.data.photo,
  });

  const updateLocaleStorage = (rawUserData) => {
    // extract specific fields from raw user data and set it in memory and cache
    const userData = rawUserData ? getUserData(rawUserData) : null;
    localStorage.setItem('user', JSON.stringify(userData));
    queryClient.setQueryData(['user'], userData);
  };

  // const getUser = () => JSON.parse(localStorage.getItem('user'));
  const getUser = () => queryClient.getQueryData(['user']);

  const signup = ({ name, email, password, passwordConfirm }) =>
    authMutation(
      {
        method: 'POST',
        path: 'users/signup',
        data: { name, email, password, passwordConfirm },
      },
      {
        onSuccess: (data, variables, context) => {
          ToastSuccess('ההרשמה בוצעה בהצלחה!');
          updateLocaleStorage(data);
          // navigate('/Login');
          // resetForm();
        },
      }
    );

  const login = ({ email, password }, resetForm) =>
    authMutation(
      {
        method: 'POST',
        path: 'users/login',
        data: { email, password },
      },
      {
        onSuccess: (data, variables, context) => {
          ToastSuccess(`שלום ${data.data.name}`);
          updateLocaleStorage(data);
          const redirectPath = location.state?.path || '/Admin';
          navigate(redirectPath, { replace: true });
          // resetForm();
        },
      }
    );

  const logout = () =>
    authMutation(
      {
        method: 'GET',
        path: 'users/logout',
        data: '',
      },
      {
        onSuccess: async (data, variables, context) => {
          // localStorage.removeItem('user');
          updateLocaleStorage(null);
        },
      }
    );

  const updateMyPassword = ({ passwordCurrent, password, passwordConfirm }) =>
    authMutation(
      {
        method: 'PATCH',
        path: 'users/updateMyPassword',
        data: { passwordCurrent, password, passwordConfirm },
      },
      {
        onSuccess: async (data, variables, context) => {
          ToastSuccess('הסיסמה שלך עודכנה בהצלחה!');
          updateLocaleStorage({
            token: data.token,
            tokenExpiration: data.tokenExpiration,
            name: data.user.name,
          });
        },
      }
    );

  return {
    getUser,
    login,
    signup,
    logout,
    updateMyPassword,
    updateLocaleStorage,
  };
};
