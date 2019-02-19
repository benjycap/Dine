import { useState } from 'react';
import Card from '../Card';
import RoleSelect from './RoleSelect';
import CustomerForm from './CustomerForm';
import RestaurantForm from './RestaurantForm';
import RegisterContext from '../../context/RegisterContext';
import roles from '../../enum/roles';
import '../../styles/register.scss';

const defaultRegistrationData = { role: roles.Customer };

export default () => {
  const [registrationData, setRegistrationData] = useState(defaultRegistrationData);
  const updateDataSlice = (dataKey, value) => setRegistrationData(currData => ({ ...currData, [dataKey]: value }));
  const isCustomer = registrationData.role === roles.Customer;

  return (
    <RegisterContext.Provider value={{ data: registrationData, updateDataSlice }}>
      <Card className="register">
        <RoleSelect />
        {isCustomer ? <CustomerForm /> : <RestaurantForm />}
      </Card>
    </RegisterContext.Provider>
  );
}
