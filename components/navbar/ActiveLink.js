import { useState, useEffect } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

export default withRouter(({ href, label, router }) => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => setIsActive(router.pathname === href));
  // Using useEffect to run this on client to allow for css transition

  return <Link href={href}><a className={isActive ? 'active' : null}>{label}</a></Link>;
});
