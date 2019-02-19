import { useEffect, useState, useContext } from 'react';
import Router from 'next/router'
import AuthContext from '../context/AuthContext';

export default ({ children }) => {
  const { loggedIn } = useContext(AuthContext);
  useEffect(() => {
    if (!loggedIn) Router.push('/');
  })

  return children;
};
