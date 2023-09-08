
export enum Status {
  Idle = 0,
  Pause,
  Tick,
}

export enum WorkType {
  Work = 1,
  Break,
}

export const INTERVAL = 1000

export const ONE_MINUTE = 60

export const DefaultWorkDuration = 1500
export const DefaultBreakDuration = 300

export const dataJsonURL = "resources/data.json"

export const colors = [
  [],
  [
    "text-green-500",
    "text-green-400",
    "text-green-300",
    "text-green-200",
    "text-green-100",
  ],
  [
    "text-red-500",
    "text-red-400",
    "text-red-300",
    "text-red-200",
    "text-red-100",
  ],
]

export const Tasks = {
  default: "default",
  work: "work",
  study: "study",
  rest: "rest",
  sport: "sport",
  other: "other",
}

export const Keys = {
  defaultWorkDuration: "defaultWorkDuration",
  defaultBreakDuration: "defaultBreakDuration",

  today: () => {
    const date = new Date();
    const key = "PomodoroTodayCount-" + date.getFullYear() + (date.getMonth()+1) + date.getDate();
    return key;
  },

  total: (taskName: string) => {
    return "PomodoroTotalCount-" + taskName
  }
}