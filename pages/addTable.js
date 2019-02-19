import Page from '../components/Page';
import Protected from '../components/Protected';
import AuthProvider from '../components/hoc/AuthProvider';
import AddTable from '../components/tables/AddTable';

export default () => (
  <AuthProvider>
    <Page>
      <Protected>
        <AddTable />
      </Protected>
    </Page>
  </AuthProvider> 
);
