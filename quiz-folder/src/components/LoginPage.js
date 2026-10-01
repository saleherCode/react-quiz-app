import { useState } from 'react';
import QuizMain from './Quiz/QuizMain';

const demoUser = { email: '', username: 'admin', password: '12345' };

function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [registrationResult, setRegistrationResult] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    const identifier = emailOrUsername.trim().toLowerCase();
    const user = [demoUser, ...registeredUsers].find((account) => (
      account.username.toLowerCase() === identifier || account.email === identifier
    ));

    if (user && user.password === enteredPassword) {
      setLoggedIn(true);
      setError('');
      return;
    }

    setError('Email/username or password is incorrect.');
  };

  const handleRegistration = (event) => {
    event.preventDefault();
    const email = newEmail.trim().toLowerCase();

    if (registeredUsers.some((account) => account.email === email)) {
      setError('An account with this email already exists.');
      return;
    }

    const baseUsername = email.split('@')[0].replace(/[^a-z0-9]/g, '') || 'user';
    const takenUsernames = new Set([demoUser, ...registeredUsers].map((account) => account.username));
    let username;

    do {
      username = `${baseUsername}${Math.floor(1000 + Math.random() * 9000)}`;
    } while (takenUsernames.has(username));

    setRegisteredUsers((users) => [...users, { email, username, password: newPassword }]);
    setRegistrationResult({ email, username });
    setNewEmail('');
    setNewPassword('');
    setError('');
  };

  if (loggedIn) {
    return <QuizMain />;
  }

  return (
    <div className="loginContent">
      <h2 className="title">{registrationResult ? 'Account created' : isRegistering ? 'Create account' : 'Login'}</h2>
      <div className="LoginWrapper">
        {registrationResult ? (
          <div className="registrationComplete">
            <p>Your account is ready. Your unique username is</p>
            <strong className="generatedUsername">{registrationResult.username}</strong>
            <p>Use your email or username to sign in.</p>
            <button
              type="button"
              className="btn"
              onClick={() => {
                setEmailOrUsername(registrationResult.username);
                setRegistrationResult(null);
                setIsRegistering(false);
              }}
            >
              Continue to login
            </button>
          </div>
        ) : (
          <form onSubmit={isRegistering ? handleRegistration : handleLogin}>
            <div className="formControls">
              {isRegistering ? (
                <>
                  <div className="formDiv">
                    <label className="form_label" htmlFor="register-email">Email</label>
                    <input
                      id="register-email"
                      name="email"
                      type="email"
                      className="form_control"
                      autoComplete="email"
                      required
                      value={newEmail}
                      onChange={(event) => setNewEmail(event.target.value)}
                    />
                  </div>
                  <div className="formDiv">
                    <label className="form_label" htmlFor="register-password">Password</label>
                    <input
                      id="register-password"
                      name="password"
                      type="password"
                      className="form_control"
                      autoComplete="new-password"
                      required
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="formDiv">
                    <label className="form_label" htmlFor="login-identifier">Email or username</label>
                    <input
                      id="login-identifier"
                      name="username"
                      type="text"
                      className="form_control"
                      autoComplete="username"
                      required
                      value={emailOrUsername}
                      onChange={(event) => setEmailOrUsername(event.target.value)}
                    />
                  </div>
                  <div className="formDiv">
                    <label className="form_label" htmlFor="login-password">Password</label>
                    <input
                      id="login-password"
                      name="password"
                      type="password"
                      className="form_control"
                      autoComplete="current-password"
                      required
                      value={enteredPassword}
                      onChange={(event) => setEnteredPassword(event.target.value)}
                    />
                  </div>
                </>
              )}
              {error && <p className="authError" role="alert">{error}</p>}
              <div className="formDiv">
                <button type="submit" className="btn">
                  {isRegistering ? 'Register' : 'Submit'}
                </button>
              </div>
              <p className="text-center">
                {isRegistering ? 'Already have an account?' : 'New here?'}{' '}
                <button
                  type="button"
                  className="authSwitch"
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setError('');
                  }}
                >
                  {isRegistering ? 'Log in' : 'Create an account'}
                </button>
              </p>
              {!isRegistering && <p className="text-center">Demo: admin / 12345</p>}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
