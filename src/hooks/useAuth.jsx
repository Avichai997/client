import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ToastSuccess } from 'components/Toasts';
import { useNavigate } from 'react-router-dom';

export const useAuth = (props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: authMutation } = useMutation();

  const getUserData = (userData) => ({
    token: userData.token,
    tokenExpiration: userData.tokenExpiration,
    id: userData.data.user._id,
    name: userData.data.user.name,
    email: userData.data.user.email,
    photo: userData.data.user.photo,
  });

  const updateLocaleStorage = (rawUserData) => {
    const userData = getUserData(rawUserData);
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
          ToastSuccess(`שלום ${data.data.user.name}`);
          updateLocaleStorage(data);
          navigate('/Admin');
          // resetForm();
        },
      }
    );

  const logout = () =>
    authMutation(
      {
        method: 'POST',
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
        method: 'POST',
        path: 'users/updateMyPassword',
        data: { passwordCurrent, password, passwordConfirm },
      },
      {
        onSuccess: async (data, variables, context) => {
          ToastSuccess('הסיסמה שלך עודכנה בהצלחה!');
          updateLocaleStorage({
            token: data.token,
            tokenExpiration: data.tokenExpiration,
            name: data.data.user.name,
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
