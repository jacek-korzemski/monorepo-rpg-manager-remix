import { useState } from 'react';
import { useUser } from '@rpg-manager/hooks';
import { Button } from '..';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useUser();

  return (
    <form id="login" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="email"> Adres email </label>
      <input
        name="email"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
      />
      <label htmlFor="password"> Hasło </label>
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
      <Button
        type="submit"
        loading={isLoading}
        onClick={() => login({ username, password })}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginComponent;
