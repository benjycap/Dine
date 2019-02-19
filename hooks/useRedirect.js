import { useEffect } from 'react';
import Router from 'next/router';

export default function useRedirect(to) {
  useEffect(() => {
    Router.push(to)
  });
}
