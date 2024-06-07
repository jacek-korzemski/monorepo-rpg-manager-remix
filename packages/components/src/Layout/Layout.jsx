import { Link } from '@remix-run/react';

import './reset.css';
import './fonts.css';
import './main.css';
import './style.css';

const Layout = ({ children = <></> }) => {
  return (
    <>
      <div class="topbar">
        <div class="filter"></div>
        <ul class="container menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
      <div class="body">{children}</div>
    </>
  );
};

export default Layout;
