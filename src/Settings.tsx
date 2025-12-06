import { FunctionComponent, useCallback } from 'react';
import styles from './Settings.module.css';
import { createDailyReport, deleteSession, fetchTags } from './api';
import { unstyledButton } from './buttonResetStyle';

type SettingsRoute = 'dashboard' | 'focusmode' | 'schedules' | 'settings';

type SettingsProps = {
  onNavigate: (route: SettingsRoute) => void;
};

const Settings: FunctionComponent<SettingsProps> = ({ onNavigate }) => {
  const handleViewTags = useCallback(async () => {
    try {
      const response = await fetchTags();
      const tagNames = response.items.map((tag) => tag.name).join(', ');
      window.alert(
        tagNames
          ? `Available tags: ${tagNames}`
          : 'No tags found. Create one from the API.',
      );
    } catch (error) {
      console.error(error);
      window.alert('Unable to load tags. Please try again.');
    }
  }, []);

  const handleSaveAccount = useCallback(async () => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const report = await createDailyReport({ date: today, format: 'pdf' });
      window.alert(
        `Daily report requested (#${report.report_id}). URL: ${report.report_url}`,
      );
    } catch (error) {
      console.error(error);
      window.alert('Failed to request a daily report.');
    }
  }, []);

  const handleDeleteSession = useCallback(async () => {
    const sessionId = window.prompt('Enter the session ID to delete');
    if (!sessionId) return;

    try {
      await deleteSession(sessionId);
      window.alert(`Session ${sessionId} deleted (HTTP 204).`);
    } catch (error) {
      console.error(error);
      window.alert('Failed to delete the session.');
    }
  }, []);

  return (
    <div className={styles.settings}>
      <div className={styles.navigation}>
        <div className={styles.leftSide} />
        <div className={styles.help}>Help</div>
        <div className={styles.contactUs}>Contact Us</div>
        <button
          type="button"
          className={styles.settings2}
          style={{ ...unstyledButton, fontWeight: 'bold' }}
          onClick={() => onNavigate('settings')}
        >
          Settings
        </button>
        <button
          type="button"
          className={styles.schedules}
          style={unstyledButton}
          onClick={() => onNavigate('schedules')}
        >
          Schedules
        </button>
        <button
          type="button"
          className={styles.focusmode}
          style={unstyledButton}
          onClick={() => onNavigate('focusmode')}
        >
          Focusmode
        </button>
        <button
          type="button"
          className={styles.dashboard}
          style={unstyledButton}
          onClick={() => onNavigate('dashboard')}
        >
          Dashboard
        </button>
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
      <button
        type="button"
        className={styles.buttonChangePhoto}
        style={unstyledButton}
        onClick={handleViewTags}
        aria-label="Load available tags"
      >
        <div className={styles.buttonPrimary}>
          <div className={styles.buttonPrimary2} />
        </div>
        <b className={styles.change}>Change</b>
      </button>
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
          <div className={styles.currentPassword}>Current Password</div>
        </div>
        <div className={styles.inputFieldContainer}>
          <div className={styles.inputField}>
            <div className={styles.inputField2} />
          </div>
          <div className={styles.newPassword}>New Password</div>
        </div>
        <b className={styles.account}>Account</b>
        <button
          type="button"
          className={styles.buttonPrimaryParent}
          style={unstyledButton}
          onClick={handleSaveAccount}
          aria-label="Save settings and request report"
        >
          <div className={styles.buttonPrimary3}>
            <div className={styles.buttonPrimary4} />
          </div>
          <b className={styles.save}>Save</b>
        </button>
      </div>
      <div className={styles.dangerZoneCard}>
        <button
          type="button"
          className={styles.buttonDeleteMyAccount}
          style={unstyledButton}
          onClick={handleDeleteSession}
          aria-label="Delete a session via API"
        >
          <div className={styles.buttonPrimary5}>
            <div className={styles.buttonPrimary6} />
          </div>
          <div className={styles.deleteMyAccount}>Delete My Account</div>
        </button>
      </div>
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
