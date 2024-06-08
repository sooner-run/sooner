interface WeekdayAverage {
  day: string;
  time: number;
  time_human_readable: string;
}

interface Language {
  language: string;
  time: number;
  time_human_readable: string;
}

interface Project {
  project: string;
  time: number;
  time_human_readable: string;
}

export interface InsightsData {
  weekday_average: WeekdayAverage[];
  top_languages: Language[];
  top_projects: Project[];
}

interface TimePeriod {
  time: string;
}

export type CodeTimeKeys = "Today" | "This week" | "This month" | "All time";

interface CodeTime {
  Today: TimePeriod;
  "This week": TimePeriod;
  "This month": TimePeriod;
  "All time": TimePeriod;
}

export interface PulseData {
  date: string;
  count: number;
}
export interface StatsResponse {
  daily_average: string;
  codetime: CodeTime;
  streak: number;
  activity: PulseData[];
}
