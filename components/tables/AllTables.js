import useGet from '../../hooks/useGet';
import Table from './Table';

export default () => {
  const data = useGet('http://localhost:3000/api/tables', []);
  return data.map(Table);
}
