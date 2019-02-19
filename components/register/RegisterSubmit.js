import { useContext } from 'react';
import Router from 'next/router';
import RegisterContext from '../../context/RegisterContext';
import AuthContext from '../../context/AuthContext';
import register from '../../services/client/register';

export default () => {
  const { data } = useContext(RegisterContext);
  const { login } = useContext(AuthContext);

  const onSubmit = () => register(data)
    .then(login)
    .then(() => Router.push('/tables'))
    .catch(err => alert(err))
    // Would prefer to have prettier error info than an alert

  return <button className="register-submit" onClick={onSubmit}>Submit</button>;
};
