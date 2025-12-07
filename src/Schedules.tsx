import {
  FormEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import styles from './Schedules.module.css';
import { createSession, fetchDashboardWeekly } from './api';
import type { DashboardWeeklyResponse } from './api';
import { unstyledButton } from './buttonResetStyle';

const MIN_SESSION_MS = 60 * 1000;

const parseTags = (value: string) =>
  value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

type ScheduleRoute = 'dashboard' | 'focusmode' | 'schedules' | 'settings';

type SchedulesProps = {
  onNavigate: (route: ScheduleRoute) => void;
};

type WeeklyRecord = {
  id: string;
  weekday: string;
  dateLabel: string;
  minutes: number;
  sessions: number;
  focus: number;
};

const Schedules: FunctionComponent<SchedulesProps> = ({ onNavigate }) => {
  const [isManualSubmitting, setIsManualSubmitting] = useState(false);
  const [manualMessage, setManualMessage] = useState<string | null>(null);
  const [showManualForm, setShowManualForm] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualFocusLevel, setManualFocusLevel] = useState('3');
  const [manualStart, setManualStart] = useState('');
  const [manualEnd, setManualEnd] = useState('');
  const [manualTags, setManualTags] = useState('');
  const [weeklySummary, setWeeklySummary] =
    useState<DashboardWeeklyResponse | null>(null);
  const [isWeeklyLoading, setIsWeeklyLoading] = useState(false);
  const [weeklyError, setWeeklyError] = useState<string | null>(null);

  const refreshWeeklySummary = useCallback(async () => {
    setIsWeeklyLoading(true);
    try {
      const summary = await fetchDashboardWeekly();
      setWeeklySummary(summary);
      setWeeklyError(null);
    } catch (error) {
      console.error(error);
      setWeeklySummary(null);
      setWeeklyError("Unable to load this week's log.");
    } finally {
      setIsWeeklyLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshWeeklySummary();
  }, [refreshWeeklySummary]);

  const weeklyRecords = useMemo<WeeklyRecord[]>(() => {
    if (!weeklySummary) return [];
    return [...weeklySummary.days]
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      )
      .map((day) => {
        const dateObject = new Date(day.date);
        return {
          id: day.date,
          weekday: dateObject.toLocaleDateString(undefined, {
            weekday: 'short',
          }),
          dateLabel: dateObject.toLocaleDateString(),
          minutes: day.total_minutes,
          sessions: day.session_count,
          focus:
            typeof day.avg_focus === 'number' && !Number.isNaN(day.avg_focus)
              ? Number(day.avg_focus)
              : 0,
        };
      });
  }, [weeklySummary]);

  const weeklyChartData = useMemo(
    () =>
      weeklyRecords.map((record) => ({
        label: record.weekday,
        minutes: record.minutes,
        focus: Number(record.focus.toFixed(1)),
      })),
    [weeklyRecords],
  );

  const hasChartData = weeklyChartData.some(
    (point) => point.minutes > 0 || point.focus > 0,
  );

  const handleManualSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      if (isManualSubmitting) return;
      if (!manualStart || !manualEnd) {
        setManualMessage('Please provide both start and end times.');
        return;
      }
      const startDate = new Date(manualStart);
      const endDate = new Date(manualEnd);
      if (
        Number.isNaN(startDate.getTime()) ||
        Number.isNaN(endDate.getTime())
      ) {
        setManualMessage('Please enter valid timestamps.');
        return;
      }
      if (endDate <= startDate) {
        setManualMessage('End time must be after the start time.');
        return;
      }
      if (endDate.getTime() - startDate.getTime() < MIN_SESSION_MS) {
        setManualMessage('Sessions must be at least 1 minute long.');
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
        setManualMessage('Session stored successfully.');
        setManualName('');
        setManualStart('');
        setManualEnd('');
        setManualTags('');
        refreshWeeklySummary();
        setShowManualForm(false);
      } catch (error) {
        console.error(error);
        setManualMessage('Failed to create session. Try again.');
      } finally {
        setIsManualSubmitting(false);
      }
    },
    [
      isManualSubmitting,
      manualEnd,
      manualFocusLevel,
      manualName,
      manualStart,
      manualTags,
      refreshWeeklySummary,
    ],
  );

  const handleToggleManualForm = useCallback(() => {
    setShowManualForm((prev) => !prev);
    setManualMessage(null);
  }, []);

  const handleCloseManualForm = useCallback(() => {
    setShowManualForm(false);
    setManualMessage(null);
  }, []);

  return (
    <div className={styles.schedules}>
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
          className={styles.schedules2}
          style={{ ...unstyledButton, fontWeight: 'bold' }}
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
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='%23FFFFFF' d='M12 8.5a3.5 3.5 0 1 1 0 7a3.5 3.5 0 0 1 0-7Zm0-6l2.2 1.6l2.6-.5l1.1 2.4l2.6.9l-.3 2.7l2 1.8l-2 1.8l.3 2.7l-2.6.9l-1.1 2.4l-2.6-.5L12 2.5Z'/%3E%3C/svg%3E"
        />
        <b className={styles.timeflow}>TIMEFLOW</b>
      </div>
      <div className={styles.header}>
        <b className={styles.schedules3}>Schedules</b>
        <img
          className={styles.vectorIcon}
          alt="Notifications"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 2a7 7 0 0 1 7 7v4.7l1.7 3.4c.3.5-.1 1.2-.7 1.2H4a1 1 0 0 1-.9-1.5L4.7 13.7V9a7 7 0 0 1 7-7Zm0 20a2.5 2.5 0 0 1-2.45-2h4.9A2.5 2.5 0 0 1 12 22Z'/%3E%3C/svg%3E"
        />
      </div>
      <div className={styles.schedulesCard}>
          <div className={styles.leftCard}>
            <div className={styles.card2} />
            <div className={styles.calendar}>
              <div className={styles.header2}>
                <b className={styles.dec2025}>DEC 2025</b>
                <div className={styles.iconChevronRightParent} />
              </div>
              <div className={styles.days}>
                <div className={styles.row}>
                  <div className={styles.weekday}>
                    <div className={styles.sunday}>Sunday</div>
                  </div>
                  <div className={styles.weekday}>
                    <div className={styles.sunday}>Monday</div>
                  </div>
                  <div className={styles.weekday}>
                    <div className={styles.sunday}>Tuesday</div>
                  </div>
                  <div className={styles.weekday4}>
                    <div className={styles.wednesday}>Wednesday</div>
                  </div>
                  <div className={styles.weekday}>
                    <div className={styles.sunday}>Thursday</div>
                  </div>
                  <div className={styles.weekday}>
                    <div className={styles.sunday}>Friday</div>
                  </div>
                  <div className={styles.weekday}>
                    <div className={styles.sunday}>Saturday</div>
                  </div>
                </div>
              </div>
              <div className={styles.days2}>
                <div className={styles.dateDefault}>
                  <div className={styles.div}>2</div>
                </div>
                <div className={styles.dateDefault2}>
                  <div className={styles.div}>7</div>
                </div>
                <div className={styles.dateDefault3}>
                  <div className={styles.div}>14</div>
                </div>
                <div className={styles.dateDefault4}>
                  <div className={styles.div}>21</div>
                </div>
                <div className={styles.dateDefault5}>
                  <div className={styles.div}>28</div>
                </div>
                <div className={styles.dateDefault6}>
                  <div className={styles.div}>9</div>
                </div>
                <div className={styles.dateDefault7}>
                  <div className={styles.div}>16</div>
                </div>
                <div className={styles.dateDefault8}>
                  <div className={styles.div}>23</div>
                </div>
                <div className={styles.dateDefault9}>
                  <div className={styles.div}>30</div>
                </div>
                <div className={styles.dateInactive}>
                  <div className={styles.div}>30</div>
                </div>
                <div className={styles.dateDefault10}>
                  <div className={styles.div}>8</div>
                </div>
                <div className={styles.dateDefault11}>
                  <div className={styles.div}>15</div>
                </div>
                <div className={styles.dateDefault12}>
                  <div className={styles.div}>22</div>
                </div>
                <div className={styles.dateDefault13}>
                  <div className={styles.div}>29</div>
                </div>
                <div className={styles.dateInactive2}>
                  <div className={styles.div}>1</div>
                </div>
                <div className={styles.dateDefault14}>
                  <div className={styles.div}>3</div>
                </div>
                <div className={styles.dateDefault15}>
                  <div className={styles.div}>10</div>
                </div>
                <div className={styles.dateDefault16}>
                  <div className={styles.div}>17</div>
                </div>
                <div className={styles.dateDefault17}>
                  <div className={styles.div}>24</div>
                </div>
                <div className={styles.dateDefault18}>
                  <div className={styles.div}>31</div>
                </div>
                <div className={styles.dateDefault19}>
                  <div className={styles.div}>4</div>
                </div>
                <div className={styles.dateDefault20}>
                  <div className={styles.div}>11</div>
                </div>
                <div className={styles.dateDefault21}>
                  <div className={styles.div}>18</div>
                </div>
                <div className={styles.dateDefault22}>
                  <div className={styles.div}>25</div>
                </div>
                <div className={styles.dateDefault23}>
                  <div className={styles.div}>13</div>
                </div>
                <div className={styles.dateDefault24}>
                  <div className={styles.div}>20</div>
                </div>
                <div className={styles.dateDefault25}>
                  <div className={styles.div}>27</div>
                </div>
                <div className={styles.dateActive}>
                  <div className={styles.div28}>6</div>
                </div>
                <div className={styles.dateInactive3}>
                  <div className={styles.div}>1</div>
                </div>
                <div className={styles.dateInactive4}>
                  <div className={styles.div}>3</div>
                </div>
                <div className={styles.dateDefault26}>
                  <div className={styles.div}>12</div>
                </div>
                <div className={styles.dateDefault27}>
                  <div className={styles.div}>26</div>
                </div>
                <div className={styles.dateDefault28}>
                  <div className={styles.div}>5</div>
                </div>
                <div className={styles.dateDefault29}>
                  <div className={styles.div}>19</div>
                </div>
                <div className={styles.dateInactive5}>
                  <div className={styles.div}>2</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rightCard}>
            <div className={styles.card3}>
              <div className={styles.card2} />
            </div>
            <div>
              <b className={styles.schedules4}>Schedules</b>
              <button
                type="button"
                className={styles.buttonAdd}
                style={unstyledButton}
                onClick={handleToggleManualForm}
                aria-label="Show session entry form"
                aria-expanded={showManualForm}
              >
                <div className={styles.buttonPrimary}>
                  <div className={styles.buttonPrimary2} />
                </div>
                <b className={styles.add}>{showManualForm ? 'Close' : 'Add'}</b>
              </button>
            </div>
            <div className={styles.weeklyLogSection}>
              <div className={styles.weeklyLogHeader}>
                <b className={styles.weeklyLogTitle}>This week's study log</b>
                <button
                  type="button"
                  className={styles.weeklyLogRefresh}
                  style={unstyledButton}
                  onClick={refreshWeeklySummary}
                  aria-live="polite"
                >
                  {isWeeklyLoading ? 'Loading...' : 'Refresh'}
                </button>
              </div>
              {weeklyRecords.length ? (
                <div className={styles.weeklyLogList}>
                  {weeklyRecords.map((record) => (
                    <div key={record.id} className={styles.weeklyLogRow}>
                      <div className={styles.weeklyLogDate}>
                        <span className={styles.weeklyLogWeekday}>
                          {record.weekday}
                        </span>
                        <span className={styles.weeklyLogFullDate}>
                          {record.dateLabel}
                        </span>
                      </div>
                      <div className={styles.weeklyLogStats}>
                        <span>{record.minutes} mins</span>
                        <span>{record.sessions} sessions</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.weeklyLogEmpty}>
                  {isWeeklyLoading
                    ? 'Loading weekly data...'
                    : weeklyError ||
                      'Log sessions this week to populate your streak.'}
                </div>
              )}
            </div>
            {showManualForm && (
              <form className={styles.manualForm} onSubmit={handleManualSubmit}>
                <h2>Manual session entry</h2>
                <div className={styles.manualGrid}>
                  <label className={styles.formField}>
                    <span>Session name</span>
                    <input
                      type="text"
                      value={manualName}
                      onChange={(event) => setManualName(event.target.value)}
                      placeholder="e.g. Writing plan"
                    />
                  </label>
                  <label className={styles.formField}>
                    <span>Focus level</span>
                    <select
                      value={manualFocusLevel}
                      onChange={(event) =>
                        setManualFocusLevel(event.target.value)
                      }
                    >
                      {[1, 2, 3, 4, 5].map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className={styles.formField}>
                    <span>Start time</span>
                    <input
                      type="datetime-local"
                      value={manualStart}
                      onChange={(event) => setManualStart(event.target.value)}
                      required
                    />
                  </label>
                  <label className={styles.formField}>
                    <span>End time</span>
                    <input
                      type="datetime-local"
                      value={manualEnd}
                      onChange={(event) => setManualEnd(event.target.value)}
                      required
                    />
                  </label>
                  <label className={`${styles.formField} ${styles.formFieldFull}`}>
                    <span>Tags (comma separated)</span>
                    <input
                      type="text"
                      value={manualTags}
                      onChange={(event) => setManualTags(event.target.value)}
                      placeholder="design, review"
                    />
                  </label>
                </div>
                <div className={styles.manualActions}>
                  <button
                    type="button"
                    className={styles.manualSecondary}
                    style={unstyledButton}
                    onClick={handleCloseManualForm}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={styles.manualPrimary}
                    style={unstyledButton}
                    disabled={isManualSubmitting}
                  >
                    {isManualSubmitting ? 'Saving...' : 'Create session'}
                  </button>
                </div>
                {manualMessage && (
                  <div className={styles.manualFeedback}>{manualMessage}</div>
                )}
              </form>
            )}
          </div>
        </div>
      <div className={styles.focusChartCard}>
          <div className={styles.focusChartHeader}>
            <div className={styles.focusChartHeadline}>
              <b>Weekly Focus Chart</b>
              <span>Minutes logged vs. average focus</span>
            </div>
            <button
              type="button"
              className={styles.focusChartRefresh}
              style={unstyledButton}
              onClick={refreshWeeklySummary}
              aria-live="polite"
            >
              {isWeeklyLoading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          <div className={styles.focusChartBody}>
            {hasChartData ? (
              <div className={styles.focusChartInner}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={weeklyChartData}
                    margin={{ top: 10, right: 16, bottom: 0, left: 16 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="label"
                      stroke="#94a3b8"
                      tick={{ fontSize: 20 }}
                      tickMargin={8}
                    />
                    <YAxis
                      yAxisId="minutes"
                      orientation="left"
                      stroke="#34d399"
                      width={40}
                      tick={{ fontSize: 20 }}
                      tickMargin={6}
                    />
                    <YAxis
                      yAxisId="focus"
                      orientation="right"
                      stroke="#6366f1"
                      domain={[0, 5]}
                      width={40}
                      tick={{ fontSize: 20 }}
                      tickMargin={6}
                    />
                  <Tooltip
                    formatter={(value: number, name) =>
                      name === 'minutes'
                        ? [`${value} mins`, 'Minutes']
                        : [`${value}`, 'Avg focus']
                    }
                  />
                  <Bar
                    yAxisId="minutes"
                    dataKey="minutes"
                    fill="#34d399"
                    radius={[6, 6, 0, 0]}
                    barSize={24}
                  />
                  <Line
                    yAxisId="focus"
                    type="monotone"
                    dataKey="focus"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className={styles.chartPlaceholder}>
                Log this week's sessions to see your minutes and focus trends.
              </div>
            )}
          </div>
        </div>
      <img
        className={styles.kakaotalk202506141319546193Icon}
        alt="Profile"
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 24 24'%3E%3Cpath fill='%23CCCCCC' d='M12 2a5 5 0 0 1 5 5a5 5 0 1 1-5-5Zm0 12c4.4 0 8 2.7 8 6v2H4v-2c0-3.3 3.6-6 8-6Z'/%3E%3C/svg%3E"
      />
    </div>
  );
};

export default Schedules;
