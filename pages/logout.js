import Logout from "../components/Logout";
import useRedirect from '../hooks/useRedirect';
import AuthProvider from '../components/hoc/AuthProvider';

export default () => {
  return (
    <AuthProvider>
      <Logout />
    </AuthProvider>
  );
};
