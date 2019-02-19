import Page from "../components/Page";
import useRedirect from '../hooks/useRedirect';
import AuthProvider from '../components/hoc/AuthProvider';

export default () => {
  useRedirect('/register');
  return (
    <AuthProvider>
      <Page />
    </AuthProvider>
  );
};
