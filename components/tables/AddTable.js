import { useState } from 'react';
import Card from '../Card';
import addTable from '../../services/client/addTable';
import '../../styles/add-table.scss';

export default () => {
  const [numSeats, setNumSeats ] = useState(4);

  const onClick = () => addTable(numSeats).then(() => alert('ok'));

  return (
    <Card className="add-table">
      <div>
        <span className="add-table-label">Number of Seats</span>
        <input type="number" value={numSeats} onChange={e => setNumSeats(e.target.value)} />
      </div>
      <button className="add-table-submit" onClick={onClick}>Add</button>
    </Card>
  )
}
