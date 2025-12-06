import { FunctionComponent } from 'react';
import styles from './SignUp.module.css';

const SignUp: FunctionComponent = () => {
  return (
    <div className={styles.signUp}>
      <div className={styles.leftSide} />
      <b className={styles.timeflow}>TimeFlow</b>
    </div>
  );
};

export default SignUp;
