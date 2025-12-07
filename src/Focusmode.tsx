import { FormEvent, FunctionComponent, useEffect, useMemo, useState } from 'react';
import styles from './Focusmode.module.css';
import { createSession } from './api';
import { unstyledButton } from './buttonResetStyle';

type FocusRoute = 'dashboard' | 'focusmode' | 'schedules' | 'settings';

type FocusmodeProps = {
  onNavigate: (route: FocusRoute) => void;
};

const MIN_SESSION_MS = 60 * 1000;

const parseTags = (value: string) =>
  value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

const Focusmode: FunctionComponent<FocusmodeProps> = ({ onNavigate }) => {
  const [timerName, setTimerName] = useState('');
  const [timerFocusLevel, setTimerFocusLevel] = useState('3');
  const [timerTags, setTimerTags] = useState('');
  const [timerStartTime, setTimerStartTime] = useState<Date | null>(null);
  const [timerElapsed, setTimerElapsed] = useState(0);
  const [timerMessage, setTimerMessage] = useState<string | null>(null);
  const [isTimerSubmitting, setIsTimerSubmitting] = useState(false);

  const [manualName, setManualName] = useState('');
  const [manualFocusLevel, setManualFocusLevel] = useState('3');
  const [manualStart, setManualStart] = useState('');
  const [manualEnd, setManualEnd] = useState('');
  const [manualTags, setManualTags] = useState('');
  const [manualMessage, setManualMessage] = useState<string | null>(null);
  const [isManualSubmitting, setIsManualSubmitting] = useState(false);

  useEffect(() => {
    if (!timerStartTime) return;
    const intervalId = window.setInterval(() => {
      setTimerElapsed(Date.now() - timerStartTime.getTime());
    }, 1000);
    return () => window.clearInterval(intervalId);
  }, [timerStartTime]);

  const formattedTimer = useMemo(() => {
    const totalSeconds = Math.floor(timerElapsed / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours} : ${minutes} : ${seconds}`;
  }, [timerElapsed]);

  const handleTimerStart = () => {
    if (timerStartTime || isTimerSubmitting) return;
    setTimerMessage(null);
    setTimerElapsed(0);
    setTimerStartTime(new Date());
  };

  const handleTimerStop = async () => {
    if (!timerStartTime || isTimerSubmitting) return;
    setTimerMessage(null);
    const end = new Date();
    const durationMs = end.getTime() - timerStartTime.getTime();
    if (durationMs < MIN_SESSION_MS) {
      setTimerMessage('Session must run for at least 1 minute before saving.');
      return;
    }
    setIsTimerSubmitting(true);
    try {
      await createSession({
        start_time: timerStartTime.toISOString(),
        end_time: end.toISOString(),
        focus_level: Number(timerFocusLevel),
        memo: timerName.trim() || 'Focus session',
        tags: parseTags(timerTags),
      });
      setTimerMessage('Session stored successfully.');
      setTimerStartTime(null);
      setTimerElapsed(0);
      setTimerName('');
      setTimerTags('');
    } catch (error) {
      console.error(error);
      setTimerMessage('Failed to save timer session. Please try again.');
    } finally {
      setIsTimerSubmitting(false);
    }
  };

  const handleManualSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isManualSubmitting) return;
    if (!manualStart || !manualEnd) {
      setManualMessage('Please provide both start and end times.');
      return;
    }
    const startDate = new Date(manualStart);
    const endDate = new Date(manualEnd);
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      setManualMessage('Please enter valid start and end times.');
      return;
    }
    if (endDate <= startDate) {
      setManualMessage('End time must be later than the start time.');
      return;
    }
    const durationMs = endDate.getTime() - startDate.getTime();
    if (durationMs < MIN_SESSION_MS) {
      setManualMessage('Manual entries must be at least 1 minute long.');
      return;
    }
    setIsManualSubmitting(true);
    setManualMessage(null);
    try {
      await createSession({
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
        focus_level: Number(manualFocusLevel),
        memo: manualName.trim() || 'Manual session',
        tags: parseTags(manualTags),
      });
      setManualMessage('Manual session stored successfully.');
      setManualName('');
      setManualStart('');
      setManualEnd('');
      setManualTags('');
    } catch (error) {
      console.error(error);
      setManualMessage('Failed to create manual session.');
    } finally {
      setIsManualSubmitting(false);
    }
  };

  return (
    <div className={styles.focusmode}>
      <div className={styles.navigation}>
        <div className={styles.leftSide} />
        <div className={styles.help}>Help</div>
        <div className={styles.contactUs}>Contact Us</div>
        <button
          type="button"
          className={styles.settings}
          style={unstyledButton}
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
          className={styles.focusmode2}
          style={{ ...unstyledButton, fontWeight: 'bold' }}
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
      <div className={styles.contentArea}>
        <div className={styles.timerCard}>
          <h2 className={styles.sectionTitle}>Focus Timer</h2>
          <div className={styles.timerDisplay}>{formattedTimer}</div>
          <div className={styles.timerPanel}>
            <div className={styles.timerFields}>
              <label className={styles.field}>
                <span>Session name</span>
                <input
                  type="text"
                  value={timerName}
                  onChange={(event) => setTimerName(event.target.value)}
                  placeholder="e.g. Deep work"
                />
              </label>
              <label className={styles.field}>
                <span>Focus level</span>
                <select
                  value={timerFocusLevel}
                  onChange={(event) => setTimerFocusLevel(event.target.value)}
                >
                  {[1, 2, 3, 4, 5].map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.field}>
                <span>Tags (comma separated)</span>
                <input
                  type="text"
                  value={timerTags}
                  onChange={(event) => setTimerTags(event.target.value)}
                  placeholder="design, review"
                />
              </label>
            </div>
            <div className={styles.timerControls}>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={handleTimerStart}
                disabled={Boolean(timerStartTime) || isTimerSubmitting}
              >
                Start
              </button>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={handleTimerStop}
                disabled={!timerStartTime || isTimerSubmitting}
              >
                Stop &amp; save
              </button>
            </div>
            {timerMessage && (
              <div className={styles.feedback} role="status">
                {timerMessage}
              </div>
            )}
          </div>
        </div>

        <form className={styles.manualForm} onSubmit={handleManualSubmit}>
          <h2 className={styles.sectionTitle}>Manual session entry</h2>
          <div className={styles.manualGrid}>
            <label className={styles.field}>
              <span>Session name</span>
              <input
                type="text"
                value={manualName}
                onChange={(event) => setManualName(event.target.value)}
                placeholder="e.g. Writing plan"
              />
            </label>
            <label className={styles.field}>
              <span>Focus level</span>
              <select
                value={manualFocusLevel}
                onChange={(event) => setManualFocusLevel(event.target.value)}
              >
                {[1, 2, 3, 4, 5].map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.field}>
              <span>Start time</span>
              <input
                type="datetime-local"
                value={manualStart}
                onChange={(event) => setManualStart(event.target.value)}
                required
              />
            </label>
            <label className={styles.field}>
              <span>End time</span>
              <input
                type="datetime-local"
                value={manualEnd}
                onChange={(event) => setManualEnd(event.target.value)}
                required
              />
            </label>
            <label className={styles.fieldFull}>
              <span>Tags (comma separated)</span>
              <input
                type="text"
                value={manualTags}
                onChange={(event) => setManualTags(event.target.value)}
                placeholder="exam, sprint"
              />
            </label>
          </div>
          <button
            type="submit"
            className={styles.primaryButton}
            disabled={isManualSubmitting}
          >
            {isManualSubmitting ? 'Saving...' : 'Create session'}
          </button>
          {manualMessage && (
            <div className={styles.feedback} role="status">
              {manualMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Focusmode;
