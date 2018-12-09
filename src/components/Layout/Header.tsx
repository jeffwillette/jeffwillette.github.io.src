import React from 'react';
import { Link } from 'gatsby';

const Header = () => (
  <AppBar position="static">
    <Link
      to="/"
      style={{
        color: 'white',
        textDecoration: 'none'
      }}
    >
      Gatsby
    </Link>
  </AppBar>
);

export default Header;
