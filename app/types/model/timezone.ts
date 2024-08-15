interface TimeSpan {
  ticks: number;
  days: number;
  milliseconds: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMilliseconds: number;
  totalMinutes: number;
  totalSeconds: number;
}

export interface TimezoneInfo {
  id: string | null;
  hasIanaId: boolean;
  displayName: string | null;
  standardName: string | null;
  daylightName: string | null;
  baseUtcOffset: TimeSpan;
  supportsDaylightSavingTime: boolean;
}
