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
