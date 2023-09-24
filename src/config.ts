
export enum Status {
  Idle = 1,
  Pause,
  Tick,
}

export enum WorkType {
  Work = 1,
  Break,
}

export const MagicNumber = 3
export const INTERVAL = 1000

export const ONE_MINUTE = 60

export const DefaultWorkDuration = 1500
export const DefaultBreakDuration = 300

export const dataJsonURL = "resources/data.json"
export const diAudioPaths = [
  "resources/di01.MP3",
  "resources/di02.MP3",
  "resources/di03.MP3",
  "resources/di04.MP3",
]
export const endAudioPaths = [
  "resources/end01.MP3",
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