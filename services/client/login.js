import { fetch } from '../fetch';

const url = 'http://localhost:3000/api/login';

export default async function login(data) {
  const { username, password } = data;
  const body = { username, password };
  return fetch(url, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}
