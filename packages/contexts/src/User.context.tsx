import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { useCookies } from 'react-cookie';

const UserContext = createContext<{
  isLoading: boolean;
  isLogged: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
  token: string | undefined;
  setToken: Dispatch<SetStateAction<string | undefined>>;
  login: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  register: () => void;
  verifyToken: (token: string) => void;
}>({
  isLoading: false,
  isLogged: false,
  setIsLogged: () => {},
  token: '',
  setToken: () => {},
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => {},
  verifyToken: () => {},
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
  const [cookies, setCookie, removeCookie] = useCookies(['70k3n']);

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
      setCookie('70k3n', data.token);
      setIsLogged(true);
    } catch (e) {
      console.error(e);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLogged(false);
    removeCookie('70k3n');
  };

  const register = () => {};

  const verifyToken = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/verifyToken`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        removeCookie('70k3n');
        setIsLogged(false);
        return false;
      }

      const data = await response.json();
      setToken(data.token);
      setCookie('70k3n', data.token);
      setIsLogged(true);
    } catch (e) {
      console.error(e);
      setIsLogged(false);
      return false;
    } finally {
      setIsLoading(false);
    }
    return true;
  };

  const value = {
    isLoading,
    isLogged,
    setIsLogged,
    token,
    setToken,
    login,
    logout,
    register,
    verifyToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
