import React from 'react';
import Link from 'next/link';

class LinkComponent extends React.Component {
  render() {
    const { className = '', to, children } = this.props;
    return (
      <Link href={to}>
        <a className={className}>{children}</a>
      </Link>
    );
  }
}

export default LinkComponent;
