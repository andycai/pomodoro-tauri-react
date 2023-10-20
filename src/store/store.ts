import { create } from "zustand"
import { DefaultBreakDuration, DefaultWorkDuration, Keys, MagicNumber, Status, Tasks, WorkType } from "../config"
import { getIntDefault, saveItem } from "./local"
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
  countdown: () => void // 倒计时
  tick: () => void
  reset: () => void
  changeTheme: () => void
  updateDuration: () => void
}

export const useStore = create<State & Actions>()((set) => ({
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
      theme: Math.floor(today / MagicNumber)
    })
  },
  countdown: () => {
    set((state) => {
      if (state.count === 0) {
        let today: number = state.today
        let total: number = state.total
        let daykey: string = state.daykey
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
          if (daykey === Keys.today()) {
            saveItem(Keys.today(), today.toString())
          } else {
            daykey = Keys.today()
            today = 1 // 隔天更新
          }
          saveItem(Keys.total(Tasks.default), total.toString())
        }
        return {
          count: count,
          status: Status.Idle,
          workType: workType,
          today: today,
          total: total,
          daykey: daykey,
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
  updateDuration: () => {
    set((state) => {
      if (state.status == Status.Idle) {
        if (state.workType == WorkType.Break) {
          return {count: getIntDefault(Keys.defaultBreakDuration, DefaultBreakDuration)}
        }
        return {count: getIntDefault(Keys.defaultWorkDuration, DefaultWorkDuration)}
      }
      return {}
    })
  },
}))