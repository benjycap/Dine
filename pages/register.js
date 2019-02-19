import Page from "../components/Page";
import Register from "../components/register/Register";
import AuthProvider from '../components/hoc/AuthProvider';

export default () => (
  <AuthProvider>
    <Page>
      <Register />
    </Page>
  </AuthProvider>
);
