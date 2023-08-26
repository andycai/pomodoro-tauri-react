export enum Status {
  Idle = 0,
  Pause,
  Tick,
}

export enum Action {
  Pause = 1,
  Reset,
  Ready,
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
