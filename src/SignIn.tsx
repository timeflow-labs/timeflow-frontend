import { FunctionComponent } from 'react';
import styles from './SignIn.module.css';

const SignIn: FunctionComponent = () => {
  return (
    <div className={styles.signIn}>
      <div className={styles.leftSide} />
      <div className={styles.loginForm}>
        <div className={styles.card}>
          <div className={styles.card2} />
        </div>
        <div className={styles.inputField}>
          <div className={styles.inputField2} />
        </div>
        <div className={styles.input} />
        <div className={styles.buttonSignIn}>
          <div className={styles.buttonPrimary}>
            <div className={styles.buttonPrimary2} />
          </div>
          <b className={styles.signIn2}>Sign In</b>
        </div>
        <div className={styles.id}>ID</div>
        <div className={styles.password}>Password</div>
        <div className={styles.forgotPassword}>Forgot password?</div>
        <div className={styles.dontHaveAnContainer}>
          <span>{`Don’t have an account? `}</span>
          <span className={styles.registerHere}>Register here</span>
        </div>
      </div>
      <b className={styles.signIn3}>Sign In</b>
      <div className={styles.signInTo}>Sign in to your account</div>
      <b className={styles.timeflow}>TimeFlow</b>
      <div className={styles.googleSignUp}>
        <div className={styles.white}>
          <div className={styles.button} />
        </div>
        <div className={styles.signUpWith}>Sign up with Google</div>
        <img
          className={styles.googleIcon1}
          alt="Google"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 533.5 544.3'%3E%3Cpath fill='%23EA4335' d='M533.5 278.4c0-17.4-1.6-34.1-4.7-50.2H272v95.2h146.9c-6.4 34.5-25.4 63.8-54 83.4v68h87.2c51.1-47 81.4-116.3 81.4-196.4z'/%3E%3Cpath fill='%23428CEB' d='M272 544.3c72.9 0 134.1-24.1 178.8-65.6l-87.2-68c-24.2 16.2-55.3 25.7-91.6 25.7-70.3 0-129.8-47.3-151.1-111H31.8v69.9c44.8 88.7 136.8 148 240.2 148z'/%3E%3Cpath fill='%2334A853' d='M120.9 325.4c-5.4-16.2-8.5-33.5-8.5-51.4s3.1-35.2 8.5-51.4v-69.9H31.8C11.5 190.3 0 229.3 0 274s11.5 83.8 31.8 121.3l89.1-69.9z'/%3E%3Cpath fill='%23FBBC04' d='M272 107.7c39.7 0 75.3 13.7 103.4 40.5l77.6-77.6C405.7 24.9 344.5 0 272 0 168.6 0 76.6 59.3 31.8 148l89.1 69.9c21.3-63.7 80.8-110.2 151.1-110.2z'/%3E%3Cpath fill='none' d='M0 0h533.5v544.3H0z'/%3E%3C/svg%3E"
        />
      </div>
      <img
        className={styles.fourLeafClover}
        alt="TimeFlow logo"
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cpath fill='%23FFFFFF' d='M100 20c-11 20-35 32-55 25-13 35 15 70 55 70s68-35 55-70c-20 7-44-5-55-25z'/%3E%3Cpath fill='%2348A57F' d='M85 70c-15-5-25-20-20-30-15-5-30 10-25 25 10 25 40 40 60 35 20 5 50-10 60-35 5-15-10-30-25-25 5 10-5 25-20 30-10 0-20 0-10 0z'/%3E%3C/svg%3E"
      />
    </div>
  );
};

export default SignIn;
