import React from 'react';
import Link from 'next/link';

const LinkComponent = ({ className = '', to, children }) => (
  <Link href={to}>
    <a className={className}>{children}</a>
  </Link>
);

export default LinkComponent;
