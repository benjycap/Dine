import { fetch } from '../fetch';

const url = 'http://localhost:3000/api/user';

export default async function userDetails() {
  return fetch(url);
}
