import React, { createContext, useState } from 'react';

const UserContext = createContext<{
  isLoading: boolean;
  isLogged: boolean;
  token: string | undefined;
  login: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  register: () => void;
}>({
  isLoading: false,
  isLogged: false,
  token: '',
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => {},
});

interface CustomImportMeta extends ImportMeta {
  env?: {
    [key: string]: string | undefined;
  };
}

const meta: CustomImportMeta = import.meta;

const UserContextProvider: React.FC<{
  children: React.ReactNode;
  apiUrl: string;
}> = ({ children, apiUrl }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [token, setToken] = useState<string | undefined>(undefined);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const formData = new FormData();
    formData.append('email', username);
    formData.append('password', password);

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new TypeError('Błąd logowania');
      }

      const data = await response.json();
      setToken(data.token);
      setIsLogged(true);
    } catch (e) {
      console.error(e);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log('hello logout');
  };

  const register = () => {};

  const value = { isLoading, isLogged, token, login, logout, register };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
