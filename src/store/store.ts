import { create } from "zustand";
import { DefaultBreakDuration, DefaultWorkDuration, Status, WorkType } from "../config";

type State = {
  defaultWorkDuration: number;
  defaultBreakDuration: number;
  count: number;
  status: Status;
  workType: WorkType;
  today: number;
}

type Actions = {
  updateDefaultWorkDuration: (duration: number) => void;
  updateDefaultBreakDuration: (duration: number) => void;
  updateToday: (count: number) => void;
  updateCount: (count: number) => void;
  countdown: () => void; // 倒计时
  tick: () => void;
  reset: () => void;
}

export const useCountStore = create<State & Actions>()((set) => ({
  defaultWorkDuration: DefaultWorkDuration,
  defaultBreakDuration: DefaultBreakDuration,
  count: DefaultWorkDuration,
  status: Status.Idle,
  workType: WorkType.Work,
  today: 0,
  updateDefaultWorkDuration: (duration: number) => {
    set({defaultWorkDuration: duration});
  },
  updateDefaultBreakDuration: (duration: number) => {
    set({defaultBreakDuration: duration});
  },
  updateToday: (count: number) => {
    set({today: count});
  },
  updateCount : (count: number) => {
    set({count: count});
  },
  countdown: () => {
    set((state) => {
      if (state.count == 0) {
        let today: number = state.today;
        let count: number = state.defaultWorkDuration;
        let workType: WorkType = WorkType.Work;
        if (state.workType == WorkType.Work) {
          today = today + 1;
          count = state.defaultBreakDuration;
          workType = WorkType.Break;
        }
        return {
          count: count,
          status: Status.Idle,
          workType: workType,
          today: today,
        }
      }
      return ({count: state.count - 1});
    });
  },
  tick: () => {
    set((state) => {
      if (state.status !== Status.Tick) {
        return {status: Status.Tick}
      }
      return {status: Status.Pause}
    });
  },
  reset: () => {
    set((state) => ({
      count: state.defaultWorkDuration,
      status: Status.Idle,
      workType: WorkType.Work,
    }))
  },
}))