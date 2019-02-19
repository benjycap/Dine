import { useContext } from 'react';
import RegisterContext from '../../context/RegisterContext';
import AuthContext from '../../context/AuthContext';
import login from '../../services/client/login';
import Router from 'next/router';

export default () => {
  const { data } = useContext(RegisterContext);
  const { login: contextLogin } = useContext(AuthContext);

  const onSubmit = () => login(data)
    .then(contextLogin)
    .then(() => Router.push('/tables'))
    .catch(err => alert(err))

  return <button className="register-submit" onClick={onSubmit}>Submit</button>;
};
