import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { useCookies } from 'react-cookie';

const UserContext = createContext<{
  isLoading: boolean;
  isLogged: boolean;
  isReady: boolean;
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
  error: string | undefined;
  setError: Dispatch<SetStateAction<string | undefined>>;
  registerSuccess?: boolean;
}>({
  isLoading: false,
  isLogged: false,
  isReady: false,
  setIsLogged: () => {},
  token: '',
  setToken: () => {},
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => {},
  verifyToken: () => {},
  error: undefined,
  setError: () => {},
  registerSuccess: false,
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
  const [error, setError] = useState<string | undefined>(undefined);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [cookies, setCookie, removeCookie] = useCookies(['70k3n']);

  useEffect(() => {
    const checkToken = async () => {
      if (cookies['70k3n']) {
        await verifyToken(cookies['70k3n']);
      }
      setIsReady(true);
    };

    checkToken();
  }, []);

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

  const register = async () => {
    setIsLoading(true);
    const form = document.getElementById('register') as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await response.json();
        location.href = '/registerSuccess';
      } else {
        setError(
          `Podczas rejestracji wystąpił błąd. Możliwe, że istnieje już użytkownik
          o tej samej nazwie użytkownika, lub hasło nie było takie samo z polem "potwierdź hasło".
          Jeśli jesteś pewien, że po Twojej stronie wszystko jest w porządku, spróbuj ponownie później. Może samo zacznie działać.`
        );
      }
    } catch (e) {
      setError('Podczas rejestracji wystąpił błąd. Spróbuj ponownie później.');
      console.error(e);
    } finally {
      setIsLoading(false);
      setRegisterSuccess(true);
    }
  };

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
    isReady,
    setIsLogged,
    token,
    setToken,
    login,
    logout,
    register,
    verifyToken,
    error,
    setError,
    registerSuccess,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
