import { useState, useEffect } from 'react';
import { fetch } from '../services/fetch';

export default function useGet(url, dataDefault) {
  const [data, setData] = useState(dataDefault);
  useEffect(() => {
    fetch(url).then(setData);
  }, []);
  return data;
}
