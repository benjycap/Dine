import { useContext, useEffect } from 'react';
import useRedirect from '../hooks/useRedirect';
import AuthContext from '../context/AuthContext';

export default () => {
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    logout();
  }, []);
  useRedirect('/');

  return null;
}
