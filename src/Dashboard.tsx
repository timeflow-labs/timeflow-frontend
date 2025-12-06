import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './Dashboard.module.css';
import {
  DashboardStreakResponse,
  DashboardTodayResponse,
  DashboardWeeklyResponse,
  SessionResponse,
  fetchDashboardStreak,
  fetchDashboardToday,
  fetchDashboardWeekly,
  fetchRecentSessions,
} from './api';
import { unstyledButton } from './buttonResetStyle';
import garden1 from './assets/1.png';
import garden2 from './assets/2.png';
import garden3 from './assets/3.png';
import garden4 from './assets/4.png';
import garden5 from './assets/5.png';

type DashboardRoute = 'dashboard' | 'focusmode' | 'schedules' | 'settings';

type DashboardProps = {
  onNavigate: (route: DashboardRoute) => void;
};

const gardenImages = [garden1, garden2, garden3, garden4, garden5];
const gardenThresholds = [60, 180, 360, 540];

const formatTimeRange = (start?: string, end?: string) => {
  if (!start || !end) return 'No time recorded';
  const startDate = new Date(start);
  const endDate = new Date(end);
  return `${startDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })} - ${endDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
};

const formatDate = (value?: string | null) => {
  if (!value) return '';
  return new Date(value).toLocaleDateString();
};

const Dashboard: FunctionComponent<DashboardProps> = ({ onNavigate }) => {
  const [todaySummary, setTodaySummary] =
    useState<DashboardTodayResponse | null>(null);
  const [streakInfo, setStreakInfo] =
    useState<DashboardStreakResponse | null>(null);
  const [weeklySummary, setWeeklySummary] =
    useState<DashboardWeeklyResponse | null>(null);
  const [recentSessions, setRecentSessions] = useState<SessionResponse[]>([]);

  const [isTodayLoading, setIsTodayLoading] = useState(false);
  const [isStreakLoading, setIsStreakLoading] = useState(false);
  const [isWeeklyLoading, setIsWeeklyLoading] = useState(false);
  const [isSessionsLoading, setIsSessionsLoading] = useState(false);

  const [todayError, setTodayError] = useState<string | null>(null);
  const [streakError, setStreakError] = useState<string | null>(null);
  const [weeklyError, setWeeklyError] = useState<string | null>(null);
  const [sessionsError, setSessionsError] = useState<string | null>(null);

  const handleFetchTodaySummary = useCallback(async () => {
    setIsTodayLoading(true);
    try {
      const data = await fetchDashboardToday();
      setTodaySummary(data);
      setTodayError(null);
    } catch (error) {
      console.error(error);
      setTodaySummary(null);
      setTodayError("Unable to load today's summary.");
    } finally {
      setIsTodayLoading(false);
    }
  }, []);

  const handleFetchStreak = useCallback(async () => {
    setIsStreakLoading(true);
    try {
      const data = await fetchDashboardStreak();
      setStreakInfo(data);
      setStreakError(null);
    } catch (error) {
      console.error(error);
      setStreakInfo(null);
      setStreakError('Unable to load streak data.');
    } finally {
      setIsStreakLoading(false);
    }
  }, []);

  const handleFetchWeekly = useCallback(async () => {
    setIsWeeklyLoading(true);
    try {
      const data = await fetchDashboardWeekly();
      setWeeklySummary(data);
      setWeeklyError(null);
    } catch (error) {
      console.error(error);
      setWeeklySummary(null);
      setWeeklyError('Unable to load weekly summary.');
    } finally {
      setIsWeeklyLoading(false);
    }
  }, []);

  const handleFetchSessions = useCallback(async () => {
    setIsSessionsLoading(true);
    try {
      const data = await fetchRecentSessions(5);
      setRecentSessions(data.items);
      setSessionsError(null);
    } catch (error) {
      console.error(error);
      setRecentSessions([]);
      setSessionsError('Unable to load recent sessions.');
    } finally {
      setIsSessionsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleFetchTodaySummary();
    handleFetchStreak();
    handleFetchWeekly();
    handleFetchSessions();
  }, [
    handleFetchTodaySummary,
    handleFetchStreak,
    handleFetchWeekly,
    handleFetchSessions,
  ]);

  const todayTotalText = todaySummary
    ? `Today's focus: ${todaySummary.total_minutes} mins (${todaySummary.session_count} sessions)`
    : (todayError ?? 'Tap "Refresh" to load today\'s focus summary.');

  const todayAvgText = todaySummary
    ? `Avg focus: ${
        todaySummary.avg_focus !== null && todaySummary.avg_focus !== undefined
          ? todaySummary.avg_focus.toFixed(1)
          : 'N/A'
      } - Top tags: ${
        todaySummary.top_tags.length
          ? todaySummary.top_tags.map((tag) => tag.name).join(', ')
          : 'none recorded'
      }`
    : "Average focus and tags will appear after loading today's summary.";

  const weeklyTotals = useMemo(() => {
    if (!weeklySummary) {
      return { minutes: 0, sessions: 0 };
    }
    const minutes = weeklySummary.days.reduce(
      (sum, day) => sum + day.total_minutes,
      0,
    );
    const sessions = weeklySummary.days.reduce(
      (sum, day) => sum + day.session_count,
      0,
    );
    return { minutes, sessions };
  }, [weeklySummary]);

  const weeklyHeadline = useMemo(() => {
    if (!weeklySummary) {
      return 'Are you ready to be immersed again today?';
    }
    return `Last 7 days - ${weeklyTotals.minutes} mins - ${weeklyTotals.sessions} sessions`;
  }, [weeklySummary, weeklyTotals.minutes, weeklyTotals.sessions]);


  const topTags = useMemo(() => {
    if (todaySummary?.top_tags?.length) {
      return todaySummary.top_tags.slice(0, 3);
    }
    return [
      { name: 'Add a tag', minutes: 0 },
      { name: 'Plan a session', minutes: 0 },
      { name: 'Stay focused', minutes: 0 },
    ];
  }, [todaySummary]);


  const gardenStageIndex = useMemo(() => {
    let stage = 0;
    gardenThresholds.forEach((threshold, index) => {
      if (weeklyTotals.minutes >= threshold) {
        stage = index + 1;
      }
    });
    return Math.min(gardenImages.length - 1, stage);
  }, [weeklyTotals.minutes]);

  const gardenImage = gardenImages[gardenStageIndex];

  const sessionCards = recentSessions.slice(0, 5);
  const primarySession = sessionCards[0];
  const secondarySession = sessionCards[1];

  const tagList = (session?: SessionResponse) =>
    session?.tags?.length ? session.tags.join(', ') : 'No tags recorded yet.';

  const lastWeeklyMinutes =
    weeklySummary && weeklySummary.days.length
      ? weeklySummary.days[weeklySummary.days.length - 1].total_minutes
      : 0;

  return (
    <div className={styles.dashboard}>
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
          className={styles.focusmode}
          style={unstyledButton}
          onClick={() => onNavigate('focusmode')}
        >
          Focusmode
        </button>
        <button
          type="button"
          className={styles.dashboard2}
          style={{ ...unstyledButton, fontWeight: 'bold' }}
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
      <div className={styles.header}>
        <b className={styles.helloGayeon}>
          <span>{`Hello, `}</span>
          <span className={styles.gayeon}>Gayeon</span>
          <span className={styles.span}>!</span>
        </b>
      </div>
      <b className={styles.myGarden}>MY Garden</b>
      <div className={styles.activitiesCard}>
        <div className={styles.card}>
          <div className={styles.card2} />
          <div className={styles.cardContent}>
            <b className={styles.cardTitle}>
              {primarySession?.memo || 'No session memo yet'}
            </b>
            <div className={styles.cardTime}>
              {primarySession
                ? formatTimeRange(primarySession.start_time, primarySession.end_time)
                : 'Start a focus session to grow your garden.'}
            </div>
            <div className={styles.cardTags}>{tagList(primarySession)}</div>
          </div>
        </div>
      </div>
      <div className={styles.topProductsCard}>
        <div className={styles.card5}>
          <div className={styles.card2} />
        </div>
        <b className={styles.topFocus}>Top Focus</b>
        <div className={styles.tagRow}>
          <div className={styles.tagKey}>1</div>
          <b className={styles.tagName}>{topTags[0]?.name}</b>
          <div className={styles.tagValue}>{topTags[0]?.minutes ?? 0}m</div>
        </div>
        <div className={styles.tagRow}>
          <div className={styles.tagKey}>2</div>
          <b className={styles.tagName}>{topTags[1]?.name}</b>
          <div className={styles.tagValue}>{topTags[1]?.minutes ?? 0}m</div>
        </div>
        <div className={styles.tagRow}>
          <div className={styles.tagKey}>3</div>
          <b className={styles.tagName}>{topTags[2]?.name}</b>
          <div className={styles.tagValue}>{topTags[2]?.minutes ?? 0}m</div>
        </div>
        {todaySummary?.highlight_memo && (
          <div className={styles.highlight}>{todaySummary.highlight_memo}</div>
        )}
      </div>
      <div className={styles.schedulesCard}>
        <div className={styles.card7}>
          <div className={styles.card2} />
        </div>
        <b className={styles.todaysSchedule}>Today's sessions</b>
        <b className={styles.todayFocus}>
          {todaySummary
            ? `${todaySummary.total_minutes} mins logged`
            : 'Today Focus'}
        </b>
        <b className={styles.avgFocusLevel}>
          {todaySummary?.avg_focus !== null &&
          todaySummary?.avg_focus !== undefined
            ? `Avg focus ${todaySummary.avg_focus.toFixed(1)}`
            : 'Avg Focus'}
        </b>
        <div className={styles.meetingWithSuppliersFromKuParent}>
          <b className={styles.meetingWithSuppliers}>
            {primarySession?.memo || 'No session yet'}
          </b>
          <div className={styles.div7}>
            {primarySession
              ? formatTimeRange(primarySession.start_time, primarySession.end_time)
              : 'Start logging time'}
          </div>
          <div className={styles.atSunsetRoad}>{tagList(primarySession)}</div>
          <div className={styles.groupChild} />
        </div>
        <button
          type="button"
          className={styles.seeAll}
          style={unstyledButton}
          onClick={handleFetchTodaySummary}
          aria-live="polite"
        >
          {isTodayLoading ? 'Loading...' : 'Refresh'}
        </button>
        <div className={styles.checkOperationAtGigaFactorParent}>
          <b className={styles.checkOperationAt}>
            {secondarySession?.memo || 'Add another entry'}
          </b>
          <div className={styles.div7}>
            {secondarySession
              ? formatTimeRange(
                  secondarySession.start_time,
                  secondarySession.end_time,
                )
              : 'You can log multiple sessions per day.'}
          </div>
          <div className={styles.atCentralJakarta}>{tagList(secondarySession)}</div>
          <div className={styles.groupItem} />
        </div>
      </div>
      <div className={styles.schedulesCard2}>
        <div className={styles.card9}>
          <div className={styles.card2} />
        </div>
        <b className={styles.todaysSchedule2}>Weekly streak</b>
        <b className={styles.streak}>
          {streakInfo
            ? `${streakInfo.current_streak} day streak (best ${streakInfo.longest_streak})`
            : 'Streak'}
        </b>
        <div className={styles.meetingWithHyojeongParent}>
          <b className={styles.meetingWithHyojeong}>
            {weeklySummary
              ? `Week of ${formatDate(weeklySummary.start_date)}`
              : weeklyError || 'Stay consistent'}
          </b>
          <div className={styles.div9}>
            {weeklySummary
              ? `${lastWeeklyMinutes} mins today`
              : isWeeklyLoading
              ? 'Loading weekly data...'
              : ''}
          </div>
          <div className={styles.atSunsetRoad2}>
            {weeklySummary
              ? `${weeklySummary.days.reduce(
                  (sum, day) => sum + day.session_count,
                  0,
                )} sessions in the last 7 days`
              : ''}
          </div>
          <div className={styles.groupChild} />
        </div>
        <button
          type="button"
          className={styles.seeAll2}
          style={unstyledButton}
          onClick={handleFetchStreak}
          aria-live="polite"
        >
          {isStreakLoading ? 'Loading...' : 'Refresh'}
        </button>
        <div className={styles.checkOperationAtGigaFactorGroup}>
          <b className={styles.meetingWithHyojeong}>
            {weeklyError || 'Track your learning path'}
          </b>
          <div className={styles.div9}>
            {isWeeklyLoading ? 'Loading weekly data...' : ''}
          </div>
          <div className={styles.atSunsetRoad2}>
            {streakInfo?.last_study_date
              ? `Last studied on ${formatDate(streakInfo.last_study_date)}`
              : ''}
          </div>
          <div className={styles.groupItem} />
        </div>
      </div>
      <b className={styles.areYouReady}>{weeklyHeadline}</b>
      <div className={styles.div11}>{todayTotalText}</div>
      <div className={styles.div12}>
        {todaySummary
          ? todayAvgText
          : (todayError ?? "Today's averages will appear after logging time.")}
      </div>
      <div className={styles.div13}>
        {streakInfo
          ? `Current streak: ${streakInfo.current_streak} days`
          : (streakError ?? 'Tap refresh to load streak info.')}
      </div>
      <div className={styles.kakaotalk202512052123403281Icon}>
        {sessionsError && (
          <div className={styles.gardenError}>{sessionsError}</div>
        )}
        {isSessionsLoading && (
          <div className={styles.gardenLoading}>Loading garden...</div>
        )}
        {!isSessionsLoading && !sessionsError && weeklyTotals.minutes === 0 && (
          <div className={styles.emptyGarden}>
            No activity logged yet. Log at least one focused hour to grow your
            plant!
          </div>
        )}
        {!isSessionsLoading && !sessionsError && weeklyTotals.minutes > 0 && (
          <>
            <img
              src={gardenImage}
              alt="Weekly garden stage"
              className={styles.gardenImage}
            />
            <div className={styles.gardenMeta}>
              <b>This week's growth</b>
              <span>{`Total focus: ${weeklyTotals.minutes} mins`}</span>
              <span>{`${weeklyTotals.sessions} sessions completed`}</span>
            </div>
          </>
        )}
      </div>
      <img
        className={styles.kakaotalk202506141319546192Icon}
        alt="Profile"
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 24 24'%3E%3Cpath fill='%23CCCCCC' d='M12 2a5 5 0 0 1 5 5a5 5 0 1 1-5-5Zm0 12c4.4 0 8 2.7 8 6v2H4v-2c0-3.3 3.6-6 8-6Z'/%3E%3C/svg%3E"
      />
    </div>
  );
};

export default Dashboard;
