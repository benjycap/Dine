import { useEffect, useState } from 'react';
import { subscribeTo401 } from '../../services/fetch';
import AuthContext from '../../context/AuthContext';
import userDetails from '../../services/client/userDetails';
import Cookies from 'js-cookie';

export default ({ children }) => {
  const [auth, setAuth] = useState({ loggedIn: true, user: {} });

  const login = (user) => {
    setAuth({ loggedIn: true, user });
  }

  const logout = () => {
    Cookies.remove('jwt');
    setAuth({ loggedIn: false, user: {} });
  }

  useEffect(() => {
    const unsubscribe = subscribeTo401(logout);
    return unsubscribe;
  });
  
  useEffect(() => {
    userDetails().then(login);
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
