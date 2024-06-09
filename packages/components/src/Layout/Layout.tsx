import './reset.css';
import './fonts.css';
import './main.css';
import './style.css';
import { ReactNode, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import { useUser } from '@rpg-manager/hooks';
import Logo from '../Logo/Logo';

const Layout = ({ children }: { children: ReactNode }) => {
  const { isLogged } = useUser();

  if (!isLogged) {
    return (
      <>
        <Logo width="256px" margin="-64px auto 0 auto" />
        <div className="container">
          <LoginForm />
        </div>
      </>
    );
  }
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
