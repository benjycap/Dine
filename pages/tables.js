import Page from '../components/Page';
import Protected from '../components/Protected';
import AuthProvider from '../components/hoc/AuthProvider';
import AllTables from '../components/tables/AllTables';

export default () => (
  <AuthProvider>
    <Page>
      <Protected>
        <AllTables />
      </Protected>
    </Page>
  </AuthProvider> 
);
