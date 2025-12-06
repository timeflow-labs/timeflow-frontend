import { FunctionComponent } from 'react';
import styles from './Settings.module.css';

const Settings: FunctionComponent = () => {
  return (
    <div className={styles.settings}>
      <div className={styles.navigation}>
        <div className={styles.leftSide} />
        <div className={styles.help}>Help</div>
        <div className={styles.contactUs}>Contact Us</div>
        <b className={styles.settings2}>Settings</b>
        <div className={styles.schedules}>Schedules</div>
        <div className={styles.focusmode}>Focusmode</div>
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
      <div className={styles.buttonChangePhoto}>
        <div className={styles.buttonPrimary}>
          <div className={styles.buttonPrimary2} />
        </div>
        <b className={styles.change}>Change</b>
      </div>
      <div className={styles.header}>
        <b className={styles.settings3}>Settings</b>
        <img
          className={styles.vectorIcon}
          alt="Notifications"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 2a7 7 0 0 1 7 7v4.7l1.7 3.4c.3.5-.1 1.2-.7 1.2H4a1 1 0 0 1-.9-1.5L4.7 13.7V9a7 7 0 0 1 7-7Zm0 20a2.5 2.5 0 0 1-2.45-2h4.9A2.5 2.5 0 0 1 12 22Z'/%3E%3C/svg%3E"
        />
      </div>
      <div className={styles.accountCard}>
        <div className={styles.card}>
          <div className={styles.card2} />
        </div>
        <div className={styles.inputFieldParent}>
          <div className={styles.inputField}>
            <div className={styles.inputField2} />
          </div>
          <div className={styles.emailAddress}>Email address</div>
        </div>
        <div className={styles.inputFieldGroup}>
          <div className={styles.inputField}>
            <div className={styles.inputField2} />
          </div>
          <img
            className={styles.eleyeOpenIcon}
            alt="Show password"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 5c5 0 9.27 3.11 11 7c-1.73 3.89-6 7-11 7s-9.27-3.11-11-7c1.73-3.89 6-7 11-7Zm0 2c-2.74 0-5.54 1.47-7.35 4C6.46 13.53 9.26 15 12 15s5.54-1.47 7.35-4C17.54 8.47 14.74 7 12 7Zm0 2a3 3 0 1 1 0 6a3 3 0 0 1 0-6Zm0 2a1 1 0 1 0 0 2a1 1 0 0 0 0-2Z'/%3E%3C/svg%3E"
          />
          <div className={styles.currentPassword}>Current Password</div>
        </div>
        <div className={styles.inputFieldContainer}>
          <div className={styles.inputField}>
            <div className={styles.inputField2} />
          </div>
          <img
            className={styles.eleyeOpenIcon}
            alt="Show password"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 5c5 0 9.27 3.11 11 7c-1.73 3.89-6 7-11 7s-9.27-3.11-11-7c1.73-3.89 6-7 11-7Zm0 2c-2.74 0-5.54 1.47-7.35 4C6.46 13.53 9.26 15 12 15s5.54-1.47 7.35-4C17.54 8.47 14.74 7 12 7Zm0 2a3 3 0 1 1 0 6a3 3 0 0 1 0-6Zm0 2a1 1 0 1 0 0 2a1 1 0 0 0 0-2Z'/%3E%3C/svg%3E"
          />
          <div className={styles.newPassword}>New Password</div>
        </div>
        <b className={styles.account}>Account</b>
        <div className={styles.buttonPrimaryParent}>
          <div className={styles.buttonPrimary3}>
            <div className={styles.buttonPrimary4} />
          </div>
          <b className={styles.save}>Save</b>
        </div>
      </div>
      <div className={styles.dangerZoneCard}>
        <div className={styles.buttonDeleteMyAccount}>
          <div className={styles.buttonPrimary5}>
            <div className={styles.buttonPrimary6} />
          </div>
          <div className={styles.deleteMyAccount}>Delete My Account</div>
        </div>
      </div>
      <img
        className={styles.pleadingFaceLeft}
        alt="Pleading face"
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'%3E%3Cpath fill='%23F5C644' d='M12 2a10 10 0 1 1 0 20a10 10 0 0 1 0-20Zm-4.5 7a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3Zm9 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3ZM12 13c-2 0-3 1.1-3 2.2c0 1.4 1.3 2.8 3 2.8s3-1.4 3-2.8c0-1.1-1-2.2-3-2.2Zm-5 5.5c-.7 0-1.3.3-1.7.7a1 1 0 1 0 1.4 1.4c.2-.2.4-.3.7-.3c.7 0 1.3-.4 1.6-1.1a1 1 0 0 0-1.9-.7a.38.38 0 0 1-.1 0Zm10 0c-.4 0-.7.1-.9.3a1 1 0 0 0 1.6 1.1c.3.3.9.3 1.2 0a1 1 0 0 0-1.4-1.4c-.2-.3-.4-.4-.7-.4Z'/%3E%3C/svg%3E"
      />
      <img
        className={styles.kakaotalk202506141319546191Icon}
        alt="Profile"
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='194' height='194' viewBox='0 0 24 24'%3E%3Cpath fill='%23CCCCCC' d='M12 2a7 7 0 1 1 0 14a7 7 0 0 1 0-14Zm0 18c-4.4 0-8 2.7-8 6v2h16v-2c0-3.3-3.6-6-8-6Z'/%3E%3C/svg%3E"
      />
      <img
        className={styles.kakaotalk202506141319546192Icon}
        alt="Profile small"
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 24 24'%3E%3Cpath fill='%23CCCCCC' d='M12 2a5 5 0 0 1 5 5a5 5 0 1 1-5-5Zm0 12c4.4 0 8 2.7 8 6v2H4v-2c0-3.3 3.6-6 8-6Z'/%3E%3C/svg%3E"
      />
    </div>
  );
};

export default Settings;
