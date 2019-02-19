import { useContext } from 'react';
import RegisterContext from '../../context/RegisterContext';

export default ({ label, type = "text", dataKey }) => {
  const { data, updateDataSlice } = useContext(RegisterContext);

  if (!dataKey) return null;

  const setDataForField = (value) => updateDataSlice(dataKey, value);
  if (!data.hasOwnProperty(dataKey)) setDataForField('');
  const onChange = (e) => setDataForField(e.target.value);

  return (
    <div className="register-text-field">
    <span className="register-label">{label}</span>
      <input type={type} value={data[dataKey] || ''} onChange={onChange} />
    </div>
  )
}
