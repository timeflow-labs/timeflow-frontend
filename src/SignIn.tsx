import { FormEvent, FunctionComponent, useState } from 'react';
import styles from './SignIn.module.css';
import { signIn } from './api';
import { unstyledButton } from './buttonResetStyle';

type SignInProps = {
  onSignIn: () => void;
  onGoToSignUp: () => void;
};

const SignIn: FunctionComponent<SignInProps> = ({
  onSignIn,
  onGoToSignUp,
}) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleSignUp = () => {
    window.open('https://accounts.google.com', '_blank', 'noopener');
  };

  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault();

    if (isSubmitting) return;

    if (!userId.trim() || !password) {
      setErrorMessage('Please enter both ID and password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await signIn({
        user_id: userId.trim(),
        password,
      });
      onSignIn();
    } catch (error) {
      console.error(error);
      setErrorMessage('Sign-in failed. Check your ID and password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    padding: '0 16px',
    fontSize: '16px',
    fontFamily: 'inherit',
    color: '#000',
  };

  return (
    <div className={styles.signIn}>
      <div className={styles.leftSide} />
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.card}>
          <div className={styles.card2} />
        </div>
        <div className={styles.inputField}>
          <div className={styles.inputField2} />
          <input
            type="text"
            name="userId"
            aria-label="ID"
            autoComplete="username"
            style={inputStyle}
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
          />
        </div>
        <div className={styles.input}>
          <input
            type="password"
            name="password"
            aria-label="Password"
            autoComplete="current-password"
            style={inputStyle}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button
          type="submit"
          className={styles.buttonSignIn}
          style={unstyledButton}
          aria-label="Sign in"
          disabled={isSubmitting}
        >
          <div className={styles.buttonPrimary}>
            <div className={styles.buttonPrimary2} />
          </div>
          <b className={styles.signIn2}>
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </b>
        </button>
        <div className={styles.id}>ID</div>
        <div className={styles.password}>Password</div>
        <div className={styles.forgotPassword}>Forgot password?</div>
        <div className={styles.dontHaveAnContainer}>
          <span>{`Don't have an account? `}</span>
          <button
            type="button"
            className={styles.registerHere}
            style={unstyledButton}
            aria-label="Go to sign up"
            onClick={onGoToSignUp}
          >
            Register here
          </button>
        </div>
        {errorMessage && (
          <div
            style={{
              position: 'absolute',
              top: 300,
              left: 30,
              width: 325,
              color: '#d90429',
              fontSize: 12,
              textAlign: 'center',
            }}
            role="alert"
          >
            {errorMessage}
          </div>
        )}
      </form>
      <b className={styles.signIn3}>Sign In</b>
      <div className={styles.signInTo}>Sign in to your account</div>
      <b className={styles.timeflow}>TimeFlow</b>
      <div className={styles.googleSignUp}>
        <div className={styles.white}>
          <button
            type="button"
            className={styles.button}
            style={unstyledButton}
            onClick={handleGoogleSignUp}
          />
        </div>
        <div className={styles.signUpWith}>Sign up with Google</div>
      </div>
    </div>
  );
};

export default SignIn;
