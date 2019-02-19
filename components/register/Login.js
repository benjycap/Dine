import { useState } from 'react';
import UserForm from './UserForm';
import LoginSubmit from './LoginSubmit';
import Card from '../Card';
import RegisterContext from '../../context/RegisterContext';
import '../../styles/register.scss';

export default () => {
  const [loginData, setLoginData] = useState({});
  const updateDataSlice = (dataKey, value) => setLoginData(currData => ({ ...currData, [dataKey]: value }));

  return (
    <RegisterContext.Provider value={{ data: loginData, updateDataSlice }}>
      <Card className="register">
        <>
          <UserForm />
          <LoginSubmit />
        </>
      </Card>
    </RegisterContext.Provider>
  );
}
