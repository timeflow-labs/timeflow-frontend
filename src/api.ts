
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

let currentUserId: string | null = null;

export const setApiUserId = (userId: string | null) => {
  currentUserId = userId;
};

const buildQueryString = (
  params: Record<string, string | number | undefined>,
): string => {
  const entries = Object.entries(params).filter(
    ([, value]) => value !== undefined && value !== null,
  );
  if (!entries.length) {
    return '';
  }

  const search = new URLSearchParams();
  entries.forEach(([key, value]) => {
    search.append(key, String(value));
  });
  const query = search.toString();
  return query ? `?${query}` : '';
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);

  if (currentUserId && !headers.has('X-User-Id')) {
    headers.set('X-User-Id', currentUserId);
  }

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    let message: string | undefined;
    const contentType = response.headers.get('content-type');
    try {
      if (contentType?.includes('application/json')) {
        const json = await response.json();
        message =
          typeof json.detail === 'string'
            ? json.detail
            : typeof json.message === 'string'
            ? json.message
            : JSON.stringify(json);
      } else {
        message = await response.text();
      }
    } catch (parseError) {
      console.warn('Failed to parse error response', parseError);
    }
    throw new Error(message || `Request failed with ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export type SessionPayload = {
  start_time: string;
  end_time: string;
  focus_level: number;
  memo?: string;
  tags?: string[];
};

export type SessionResponse = {
  id: number;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  focus_level: number;
  memo?: string | null;
  tags: string[];
  created_at?: string;
};

export type RecentSessionsResponse = {
  items: SessionResponse[];
};

export type DashboardTopTag = {
  name: string;
  minutes: number;
};

export type DashboardTodayResponse = {
  date: string;
  total_minutes: number;
  avg_focus: number | null;
  session_count: number;
  top_tags: DashboardTopTag[];
  highlight_memo?: string | null;
};

export type DashboardDailyPoint = {
  date: string;
  total_minutes: number;
  avg_focus: number | null;
  session_count: number;
};

export type DashboardWeeklyResponse = {
  start_date: string;
  end_date: string;
  days: DashboardDailyPoint[];
};

export type DashboardHeatmapResponse = {
  cells: {
    date: string;
    total_minutes: number;
  }[];
};

export type DashboardStreakResponse = {
  current_streak: number;
  longest_streak: number;
  last_study_date?: string | null;
};

export type TagsResponse = {
  items: {
    id: string;
    name: string;
  }[];
};

export type DailyReportRequest = {
  date: string;
  format: string;
};

export type DailyReportResponse = {
  report_id: string;
  report_url: string;
};

export const createSession = (payload: SessionPayload) =>
  request<SessionResponse>('/sessions', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const fetchRecentSessions = (limit = 10) =>
  request<RecentSessionsResponse>(
    `/sessions/recent${buildQueryString({ limit })}`,
  );

export const fetchSessionDetail = (sessionId: string) =>
  request<SessionResponse>(`/sessions/${sessionId}`);

export const updateSession = (
  sessionId: string,
  payload: Partial<SessionPayload>,
) =>
  request<SessionResponse>(`/sessions/${sessionId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

export const deleteSession = (sessionId: string) =>
  request<void>(`/sessions/${sessionId}`, {
    method: 'DELETE',
  });

export const fetchDashboardToday = (date?: string) =>
  request<DashboardTodayResponse>(
    `/dashboard/today${buildQueryString({ date })}`,
  );

export const fetchDashboardWeekly = (endDate?: string) =>
  request<DashboardWeeklyResponse>(
    `/dashboard/weekly${buildQueryString({ end_date: endDate })}`,
  );

export const fetchDashboardHeatmap = (
  startDate?: string,
  endDate?: string,
) =>
  request<DashboardHeatmapResponse>(
    `/dashboard/heatmap${buildQueryString({
      start_date: startDate,
      end_date: endDate,
    })}`,
  );

export const fetchDashboardStreak = () =>
  request<DashboardStreakResponse>('/dashboard/streak');

export const fetchTags = () => request<TagsResponse>('/tags');

export const createDailyReport = (payload: DailyReportRequest) =>
  request<DailyReportResponse>('/reports/daily', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export type SignInRequest = {
  user_id: string;
  password: string;
};

export type SignInResponse = {
  id: string;
  email: string;
  name?: string;
};

export const signIn = (payload: SignInRequest) =>
  request<SignInResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export type SignUpPayload = {
  user_id: string;
  email: string;
  password: string;
  gender?: string;
  name?: string;
};

export type SignUpResponse = {
  id: string;
  email: string;
  gender?: string;
  name?: string;
  created_at?: string;
  current_streak?: number;
  longest_streak?: number;
};

export const signUp = (payload: SignUpPayload) =>
  request<SignUpResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
