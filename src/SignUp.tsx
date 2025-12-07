import { FormEvent, FunctionComponent, useState } from 'react';
import signInStyles from './SignIn.module.css';
import { signUp } from './api';
import { unstyledButton } from './buttonResetStyle';

type SignUpProps = {
  onGoToSignIn?: () => void;
};

const SignUp: FunctionComponent<SignUpProps> = ({ onGoToSignIn }) => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    padding: '0 16px',
    fontSize: 16,
    fontFamily: 'inherit',
    color: '#000',
  } as const;

  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault();

    if (isSubmitting) return;

    if (!userId.trim() || !email.trim() || !password) {
      setError('Please fill out ID, Email, and Password.');
      setMessage(null);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      await signUp({
        user_id: userId.trim(),
        email: email.trim(),
        password,
        name: name.trim() || undefined,
        gender: gender || undefined,
      });
      setMessage(
        'Sign-up successful! Please check your email and sign in to continue.',
      );
    } catch (signUpError) {
      console.error(signUpError);
      if (signUpError instanceof Error) {
        setError(signUpError.message);
      } else {
        setError('Unable to complete sign-up. Please verify your info.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={signInStyles.signIn}>
      <div className={signInStyles.leftSide}>
        <b className={signInStyles.timeflow}>TimeFlow</b>
      </div>
      <form
        className={signInStyles.loginForm}
        onSubmit={handleSubmit}
        style={{ height: 540 }}
      >
        <div
          className={`${signInStyles.card} ${signInStyles.cardTall}`}
        >
          <div
            className={`${signInStyles.card2} ${signInStyles.card2Tall}`}
          />
        </div>
        <div className={signInStyles.inputField} style={{ top: 59 }}>
          <div className={signInStyles.inputField2} />
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
        <div className={signInStyles.inputField} style={{ top: 119 }}>
          <div className={signInStyles.inputField2} />
          <input
            type="email"
            name="email"
            aria-label="Email"
            autoComplete="email"
            style={inputStyle}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className={signInStyles.inputField} style={{ top: 179 }}>
          <div className={signInStyles.inputField2} />
          <input
            type="text"
            name="name"
            aria-label="Name"
            autoComplete="name"
            style={inputStyle}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className={signInStyles.inputField} style={{ top: 239 }}>
          <div className={signInStyles.inputField2} />
          <input
            type="password"
            name="password"
            aria-label="Password"
            autoComplete="new-password"
            style={inputStyle}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className={signInStyles.inputField} style={{ top: 299 }}>
          <div className={signInStyles.inputField2} />
          <select
            name="gender"
            aria-label="Gender"
            style={{ ...inputStyle, backgroundColor: 'transparent' }}
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          >
            <option value="">Select gender (optional)</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className={signInStyles.buttonSignIn}
          style={{ ...unstyledButton, top: 385 }}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          <div className={signInStyles.buttonPrimary}>
            <div className={signInStyles.buttonPrimary2} />
          </div>
          <b className={signInStyles.signIn2}>
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </b>
        </button>
        <div className={signInStyles.id} style={{ top: 30 }}>
          ID
        </div>
        <div className={signInStyles.id} style={{ top: 90 }}>
          Email
        </div>
        <div className={signInStyles.id} style={{ top: 150 }}>
          Name
        </div>
        <div className={signInStyles.id} style={{ top: 210 }}>
          Password
        </div>
        <div className={signInStyles.id} style={{ top: 270 }}>
          Gender
        </div>
        <div className={signInStyles.forgotPassword} style={{ top: 340 }}>
          Please use a password with at least 8 characters.
        </div>
        <div
          className={signInStyles.dontHaveAnContainer}
          style={{ top: 480 }}
        >
          <span>Already have an account? </span>
          <button
            type="button"
            className={signInStyles.registerHere}
            style={unstyledButton}
            onClick={onGoToSignIn}
          >
            Sign in
          </button>
        </div>
        {error && (
          <div
            style={{
              position: 'absolute',
              top: 430,
              left: 30,
              width: 325,
              color: '#d90429',
              fontSize: 12,
              textAlign: 'center',
            }}
            role="alert"
          >
            {error}
          </div>
        )}
        {message && (
          <div
            style={{
              position: 'absolute',
              top: error ? 470 : 430,
              left: 30,
              width: 325,
              color: '#34d45a',
              fontSize: 12,
              textAlign: 'center',
            }}
            role="status"
          >
            {message}
          </div>
        )}
      </form>
      <b className={signInStyles.signIn3}>Sign Up</b>
      <div className={signInStyles.signInTo}>
        Fill the form to create your account.
      </div>
      <div className={signInStyles.forgotPassword}>
        Need to go back? Use the button above to return to Sign In.
      </div>
    </div>
  );
};

export default SignUp;
