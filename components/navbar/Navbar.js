import { useContext } from 'react';
import LoggedOutLinks from './LoggedOutLinks';
import RestaurantLinks from './RestaurantLinks';
import CustomerLinks from './CustomerLinks';
import AuthContext from '../../context/AuthContext';
import roles from '../../enum/roles';
import '../../styles/navbar.scss';

export default () => {
  const { user } = useContext(AuthContext);

  const renderLinks = () => {
    switch(user.role) {
      case roles.Customer:
        return <CustomerLinks />;
      case roles.Restaurant:
        return <RestaurantLinks />;
      default: 
        return <LoggedOutLinks />;
    }
  }

  return (
    <div id="navbar">
      <img id="navbar-logo" src="/static/assets/logo.png" alt="logo" />
      <div id="navbar-links">
        {renderLinks()}
      </div>
    </div>
  );
}
