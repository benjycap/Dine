import { useContext } from 'react';
import RegisterContext from '../../context/RegisterContext';
import roles from '../../enum/roles';

const Selection = ({ label, role, select, isSelected }) => (
  <div onClick={select} className={["register-select-role", isSelected && "selected"].join(' ')}>
    <img src={`/static/assets/${role}-${isSelected ? 'white' : 'blue'}.png`} />
    <span>{label}</span>
  </div>
);

export default () => {
  const { data, updateDataSlice } = useContext(RegisterContext);
  const isCustomer = data.role === roles.Customer;
  const setIsCustomer = (isCust) => () => updateDataSlice('role', isCust ? roles.Customer : roles.Restaurant);

  return (
    <div className="register-role">
      <span className="register-label">{'I\'m a'}</span>
      <div>
        <Selection role="customer" label="Customer" isSelected={isCustomer} select={setIsCustomer(true)} />
        <Selection role="restaurant" label="Restaurant" isSelected={!isCustomer} select={setIsCustomer(false)} />
      </div>
    </div>
  );
};
