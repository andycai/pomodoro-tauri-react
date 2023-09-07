import { create } from "zustand"
import { DefaultBreakDuration, DefaultWorkDuration, Keys, Status, WorkType } from "../config"

type State = {
  defaultWorkDuration: number
  defaultBreakDuration: number
  count: number
  status: Status
  workType: WorkType
  daykey: string
  today: number // 当天番茄钟
  total: number // 总番茄钟
}

type Actions = {
  initData: (dw:number, db:number, today:number, total:number, count:number) => void
  updateDefaultWorkDuration: (duration: number) => void
  updateDefaultBreakDuration: (duration: number) => void
  updateDaykey: (key: string) => void
  updateToday: (count: number) => void
  countdown: () => void // 倒计时
  tick: () => void
  reset: () => void
}

export const useCountStore = create<State & Actions>()((set) => ({
  defaultWorkDuration: DefaultWorkDuration,
  defaultBreakDuration: DefaultBreakDuration,
  count: DefaultWorkDuration,
  status: Status.Idle,
  workType: WorkType.Work,
  daykey: Keys.today(),
  today: 0,
  total: 0,
  initData: (dw:number, db:number, today:number, total:number, count:number) => {
    set({
      defaultWorkDuration: dw,
      defaultBreakDuration: db,
      today: today,
      total: total,
      count: count,
    })
  },
  updateDefaultWorkDuration: (duration: number) => {
    set({defaultWorkDuration: duration})
  },
  updateDefaultBreakDuration: (duration: number) => {
    set({defaultBreakDuration: duration})
  },
  updateDaykey: (key: string) => {
    set({daykey: key})
  },
  updateToday: (count: number) => {
    set({today: count})
  },
  countdown: () => {
    set((state) => {
      if (state.count == 0) {
        let today: number = state.today
        let total: number = state.total
        let count: number = state.defaultWorkDuration
        let workType: WorkType = WorkType.Work
        if (state.workType == WorkType.Work) {
          today = today + 1
          total = total + 1
          count = state.defaultBreakDuration
          workType = WorkType.Break
        }
        return {
          count: count,
          status: Status.Idle,
          workType: workType,
          today: today,
          total: total,
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
    set((state) => ({
      count: state.defaultWorkDuration,
      status: Status.Idle,
      workType: WorkType.Work,
    }))
  },
}))