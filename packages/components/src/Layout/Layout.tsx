import './reset.css';
import './fonts.css';
import './main.css';
import './style.css';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="topbar">
        <div className="filter"></div>
        <ul className="container menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
      <div className="body">{children}</div>
    </>
  );
};

export default Layout;
