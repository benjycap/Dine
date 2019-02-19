import { fetch } from '../fetch';

const url = 'http://localhost:3000/api/table';

export default async function login(numSeats) {
  const body = { numSeats };
  return fetch(url, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}
