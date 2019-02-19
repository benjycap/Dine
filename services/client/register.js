import { fetch } from '../fetch';
import roles from '../../enum/roles';

const baseUrl = 'http://localhost:3000/api/register';

export default async (data) => {
  const { role } = data;
  switch (role) {
    case roles.Customer: {
      const { username, password } = data;
      const body = { username, password, role };
      return fetch(`${baseUrl}/customer`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
    }
    case roles.Restaurant: {
      const { username, password, name, location } = data;
      const body = { username, password, role, name, location };
      return fetch(`${baseUrl}/restaurant`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
    }
    default:
      return Promise.reject('Invalid Role');
  }
}
