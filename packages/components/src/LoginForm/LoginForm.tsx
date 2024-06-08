import React, { useState, useEffect, FormEvent } from 'react';
import Button from '../Button/Button';
import styled from 'styled-components';

const LoginComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [mount, setMount] = useState<boolean>(false);

  const postLogin = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_API}/login`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new TypeError('Błąd logowania');
      }

      const data = await response.json();
      sessionStorage.setItem('token', data.token);
      window.location.href = '/loginSuccess';
    } catch (e) {
      console.error(e);
      setError('Wystąpił błąd podczas logowania 😟');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setMessage(undefined);
    window.location.href = '/logoutSuccess';
  };

  const retry = () => {
    setMessage(undefined);
    setError(undefined);
  };

  useEffect(() => {
    setMount(true);
    if (sessionStorage.getItem('token')) {
      setMessage('Jesteś już zalogowany!');
    }
  }, []);

  const btnClass = isLoading ? 'loading' : '';

  return (
    <>
      {mount && (
        <>
          <h1>{import.meta.env.VITE_PUBLIC_API}</h1>
          {message ? (
            <Message>
              <h1>{message}</h1>
              <Button onClick={logout} className="btn">
                Wyloguj
              </Button>
            </Message>
          ) : error ? (
            <Error>
              <p>{error}</p>
              <Button onClick={retry} className="btn">
                Spróbuj ponownie
              </Button>
            </Error>
          ) : (
            <form id="login" onSubmit={postLogin}>
              <label htmlFor="email"> Adres email </label>
              <Input
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <label htmlFor="password"> Hasło </label>
              <Input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" className={btnClass} loading={isLoading}>
                Login
              </Button>
            </form>
          )}
        </>
      )}
    </>
  );
};

export default LoginComponent;

const Message = styled.div`
  text-align: center;
  margin: auto;
  height: fit-content;
  width: fit-content;

  h1 {
    margin-bottom: 15px;
  }
`;

const Error = styled.div`
  font-size: 16px;
  margin: 15px auto;
  border: 1px solid red;
  border-radius: 4px;
  background: white;
  color: red;

  p {
    margin-bottom: 15px;
  }
`;

const Input = styled.input`
  display: block;
  margin: 10px auto;
`;
