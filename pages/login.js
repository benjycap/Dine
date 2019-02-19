import Page from "../components/Page";
import Login from "../components/register/Login";
import AuthProvider from '../components/hoc/AuthProvider';

export default () => (
  <AuthProvider>
    <Page>
      <Login />
    </Page>
  </AuthProvider>
);
