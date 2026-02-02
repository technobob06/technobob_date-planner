
export enum Screen {
  HOME = 'HOME',
  SPIN = 'SPIN',
  RESULT = 'RESULT',
  JOURNAL = 'JOURNAL'
}

export type DateMood = 'Romantic' | 'Adventurous' | 'Chill';

export interface DateOption {
  id: string;
  label: string;
  emoji: string;
}

export interface DateScheduleStep {
  time: string;
  activity: string;
}

export interface DatePlan {
  id: string;
  where: DateOption;
  eat: DateOption;
  do: DateOption;
  mood: DateMood;
  aiVibe?: string;
  aiSchedule?: DateScheduleStep[];
  aiOutfit?: string;
  timestamp: number;
}
