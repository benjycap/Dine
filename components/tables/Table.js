import Card from '../Card';
import '../../styles/table.scss'

export default ({ name, available, numSeats, rating }) => (
  <Card className="table">
    <div>
      <span className="table-label">Restaurant name</span>
      <span className="table-value">{name}</span>
    </div>
    <div>
      <span className="table-label">Available?</span>
      <span className="table-value">{available ? 'Available!' : 'Taken'}</span>
    </div>
    <div>
      <span className="table-label">Number of seats</span>
      <span className="table-value">{numSeats}</span>
    </div>
    {rating && <div>
      <span className="table-label">Rating</span>
      <span className="table-value">{`${rating.toFixed(2)} / 5`}</span>
    </div>}
  </Card>
)
