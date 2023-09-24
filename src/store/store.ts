import { create } from "zustand"
import { DefaultBreakDuration, DefaultWorkDuration, Keys, MagicNumber, Status, WorkType } from "../config"
import { getIntDefault } from "./local"
import { themeNum } from "../style"

type State = {
  count: number
  status: Status
  workType: WorkType
  daykey: string
  today: number // 当天番茄钟
  total: number // 总番茄钟
  theme: number
}

type Actions = {
  initData: (today: number, total: number, count: number) => void
  updateDaykey: (key: string) => void
  updateToday: (count: number) => void
  countdown: () => void // 倒计时
  tick: () => void
  reset: () => void
  changeTheme: () => void
}

export const useCountStore = create<State & Actions>()((set) => ({
  count: getIntDefault(Keys.defaultWorkDuration, DefaultWorkDuration),
  status: Status.Idle,
  workType: WorkType.Work,
  daykey: Keys.today(),
  today: 0,
  total: 0,
  theme: 0,
  initData: (today: number, total: number, count: number) => {
    set({
      today: today,
      total: total,
      count: count,
    })
  },
  updateDaykey: (key: string) => {
    set({daykey: key})
  },
  updateToday: (count: number) => {
    set({today: count})
  },
  countdown: () => {
    set((state) => {
      if (state.count === 0) {
        let today: number = state.today
        let total: number = state.total
        let count: number = getIntDefault(Keys.defaultWorkDuration, DefaultWorkDuration) 
        let theme: number = state.theme
        let workType: WorkType = WorkType.Work
        if (state.workType === WorkType.Work) {
          today = today + 1
          total = total + 1
          if (today % MagicNumber === 0) {
            theme = (theme + 1) % themeNum
          }
          count = getIntDefault(Keys.defaultBreakDuration, DefaultBreakDuration) 
          workType = WorkType.Break
        }
        return {
          count: count,
          status: Status.Idle,
          workType: workType,
          today: today,
          total: total,
          theme: theme
        }
      }
      return ({count: state.count - 1})
    })
  },
  tick: () => {
    set((state) => {
      if (state.status !== Status.Tick) {
        return {status: Status.Tick}
      }
      return {status: Status.Pause}
    })
  },
  reset: () => {
    set({
      count: getIntDefault(Keys.defaultWorkDuration, DefaultWorkDuration),
      status: Status.Idle,
      workType: WorkType.Work,
    })
  },
  changeTheme: () => {
    set((state) => {
      return { theme: (state.theme + 1) % themeNum }
    })
  },
}))