import { useUser } from '@rpg-manager/hooks';
import { ReactNode, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import LoginForm from '../LoginForm/LoginForm';
import Logo from '../Logo/Logo';
import './css/reset.css';
import './css/fonts.css';
import './css/main.css';

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: row;
  li {
    margin-left: 0;
  }
  li a {
    display: block;
    height: 100%;
    line-height: 88px;
    color: #fff;
    padding: 0 24px;
  }
`;

const Layout = ({ children }: { children: ReactNode }) => {
  const { isLogged, logout, isReady } = useUser();

  if (!isReady) {
    return null;
  }

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
        <div className="container">
          <TopBar>
            <Logo width="96px" withText />
            <Menu>
              <li>
                <Link to="/">Moje karty</Link>
              </li>
              <li>
                <Link to="/addCard">Dodaj kartę</Link>
              </li>
              <li>
                <Link to="/#" onClick={logout}>
                  Wyloguj
                </Link>
              </li>
            </Menu>
          </TopBar>
        </div>
      </div>
      <div className="body">{children}</div>
    </>
  );
};

export default Layout;
