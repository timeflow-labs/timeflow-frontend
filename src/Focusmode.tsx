import { FunctionComponent } from 'react';
import styles from './Focusmode.module.css';

const Focusmode: FunctionComponent = () => {
  return (
    <div className={styles.focusmode}>
      <div className={styles.navigation}>
        <div className={styles.leftSide} />
        <div className={styles.help}>Help</div>
        <div className={styles.contactUs}>Contact Us</div>
        <div className={styles.settings}>Settings</div>
        <div className={styles.schedules}>Schedules</div>
        <b className={styles.focusmode2}>Focusmode</b>
        <div className={styles.dashboard}>Dashboard</div>
        <img
          className={styles.transactionIcon}
          alt="Focusmode"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='%23FFFFFF' d='M12 2a10 10 0 1 1 0 20a10 10 0 0 1 0-20Zm0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16Zm1 2v7h-2V6h2Zm0 9v2h-2v-2h2Z'/%3E%3C/svg%3E"
        />
        <img
          className={styles.scheduleIcon}
          alt="Schedules"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='%23FFFFFF' d='M7 3h2v2h6V3h2v2h3v16H4V5h3V3Zm12 6H5v10h14V9Zm-9 2h2v2H10v-2Zm0 3h2v2H10v-2Zm3-3h2v2h-2v-2Zm0 3h2v2h-2v-2Z'/%3E%3C/svg%3E"
        />
        <img
          className={styles.dashboardIcon}
          alt="Dashboard"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='%23FFFFFF' d='M4 13h6v7H4v-7Zm10-9h6v16h-6V4ZM4 4h6v7H4V4Zm10 9h6v7h-6v-7Z'/%3E%3C/svg%3E"
        />
        <img
          className={styles.settingIcon}
          alt="Settings"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='%23FFFFFF' d='M12 8.5a3.5 3.5 0 1 1 0 7a3.5 3.5 0 0 1 0-7Zm0-6l2.2 1.6l2.6-.5l1.1 2.4l2.6.9l-.3 2.7l2 1.8l-2 1.8l.3 2.7l-2.6.9l-1.1 2.4l-2.6-.5L12 22l-2.2-1.6l-2.6.5l-1.1-2.4l-2.6-.9l.3-2.7l-2-1.8l2-1.8l-.3-2.7l2.6-.9l1.1-2.4l2.6.5L12 2.5Z'/%3E%3C/svg%3E"
        />
        <b className={styles.timeflow}>TIMEFLOW</b>
      </div>
      <div className={styles.focusmodeChild} />
      <div className={styles.div}>25 : 00 : 00</div>
      <div className={styles.iconifyIcons} />
    </div>
  );
};

export default Focusmode;
