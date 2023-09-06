
export enum Status {
  Idle = 0,
  Pause,
  Tick,
}

export enum WorkType {
  Work = 1,
  Break,
}

export enum LoadDataStatus {
  Idle = 0,
  Loading,
  Loaded,
}

export const ONE_MINUTE = 60

export const DefaultWorkDuration = 1500
export const DefaultBreakDuration = 300

export const DayKey = "PomodoroTodayCount-"
export const TotalKey = "PomodoroTotalCount-"