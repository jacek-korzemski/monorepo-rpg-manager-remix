import { Box } from '..';
import { useUser } from '@rpg-manager/hooks';

const Register = () => {
  const { register, isLoading, registerSuccess, error } = useUser();

  const btnClass = isLoading ? 'btn loading' : 'btn';

  if (error) {
    return (
      <Box fullWidth>
        <h1>Wystąpił błąd</h1>
        <p>{error}</p>
        <p>
          Spróbuj <a href="/">odświeżyć stronę</a> i spróbuj ponownie.
        </p>
      </Box>
    );
  }

  if (registerSuccess) {
    return (
      <Box fullWidth>
        <h1>Pomyślnie zarejestrowano!</h1>
        <p>
          Może się teraz zalogować <a href="/">tutaj</a>.
        </p>
      </Box>
    );
  }

  return (
    <Box fullWidth>
      <form
        id="register"
        onSubmit={(e) => {
          e.preventDefault();
          register();
        }}
      >
        <h1>Załóż konto</h1>
        <label htmlFor="email">Nazwa użytkownika</label>
        <input name="email" type="text" disabled={isLoading} />
        <label htmlFor="password">Hasło</label>
        <input name="password" type="password" disabled={isLoading} />
        <label htmlFor="confirm_password">Potwierdź hasło</label>
        <input name="confirm_password" type="password" disabled={isLoading} />
        <button type="submit" className={btnClass}>
          Zarejestruj
        </button>
      </form>
    </Box>
  );
};

export default Register;
