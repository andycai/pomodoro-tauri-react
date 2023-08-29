import { useCallback, useEffect, useReducer, useRef } from "react";
import "./App.css";
import { Action, LoadDataStatus, Status, WorkType } from "./enum"
import TimeCounterCom from "./components/TimeCounterCom";
import OperactionCom from "./components/OperationCom";
import TodayCountCom from "./components/TodayCountCom";
import RefreshCom from "./components/RefreshCom";
import { resolveResource } from "@tauri-apps/api/path";
import { readTextFile } from "@tauri-apps/api/fs";
import { CountContext, ResetContext, StatusContext, TodayCountContext } from "./utils";

function defaultWorkDuration() {
  return localStorage.getItem("defaultWorkDuration") === null ? 1500 : Number(localStorage.getItem("defaultWorkDuration"));
}
function defaultBreakDuration() {
  return localStorage.getItem("defaultBreakDuration") === null ? 300 : Number(localStorage.getItem("defaultBreakDuration"));
}

function convertDate() {
  const date = new Date();
  const key = `todayCount-${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`;

  return key;
}

function getLocalTodayCount() {
  return localStorage.getItem(convertDate()) === null ? 0 : Number(localStorage.getItem(convertDate()));
}

function updateLocalTodayCount(count: number) {
  localStorage.setItem(convertDate(), count.toString());
}

const initialState = {
  count: defaultWorkDuration(),
  status: Status.Idle,
  loaded: LoadDataStatus.Idle,
  todayCount: getLocalTodayCount(),
  workType: WorkType.Work,
}

function workReducer(state: any, action: any) {
  switch (action.type) {
    case Action.Pause:
      return {
        ...state,
        status: Status.Pause,
      };
    case Action.Reset:
      // localStorage.setItem("defaultWorkDuration", "5");
      // localStorage.setItem("defaultBreakDuration", "2");
      return {
        ...state,
        count: defaultWorkDuration(),
        status: Status.Idle,
        workType: WorkType.Work,
      };
    case Action.Ready:
      return {
        ...state,
        status: Status.Tick,
      };
    case Action.Tick:
      if (action.count < 0) {
        if (action.workType === WorkType.Work) {
          updateLocalTodayCount(action.todayCount + 1);
          return {
            ...state,
            count: defaultBreakDuration(),
            status: Status.Idle,
            todayCount: action.todayCount + 1,
            workType: WorkType.Break,
          }
        } else {
          return {
            ...state,
            count: defaultWorkDuration(),
            status: Status.Idle,
            workType: WorkType.Work,
          }
        }
      }
      return {
        ...state,
        count: action.count,
      }
    default:
      return state;
  }
}

function useInterval(callback: any, delay: number, status: Status) {
  const savedCallback = useRef(callback);
  let id: any;

  useEffect(() => {
    savedCallback.current = callback;
  })

  useEffect(() => {
    clearInterval(id);
    function tick() {
      savedCallback.current();
    }
    if (status === Status.Tick) {
      id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [status]);
}

function App() {
  console.info("render App");
  const [state, dispatch] = useReducer(workReducer, initialState);
  const { count, status, loaded, todayCount, workType } = state;

  function useAsyncEffect(effect: () => Promise<void | (() => void)>, deps?: any[]) {
    return useEffect(
      () => {
        const cleanupPromise = effect();
        return () => { cleanupPromise.then(cleanup => cleanup && cleanup()) }
      },
      deps
    );
  }

  useAsyncEffect(
    async () => {
      if (loaded !== LoadDataStatus.Idle) return;
      state.loaded = LoadDataStatus.Loading;
      const resourcePath = await resolveResource("resources/data.json");
      const data = JSON.parse(await readTextFile(resourcePath));

      if (localStorage.getItem("defaultWorkDuration") === null) {
        localStorage.setItem("defaultWorkDuration", data.defaultWorkDuration().toString());
      }

      if (localStorage.getItem("defaultBreakDuration") === null) {
        localStorage.setItem("defaultBreakDuration", data.defaultBreakDuration.toString());
      }

      state.todayCount = getLocalTodayCount();
      state.loaded = LoadDataStatus.Loaded;
    }, []
  );

  useInterval(() => {
   dispatch({ type: Action.Tick, count: count - 1, workType: workType, todayCount: todayCount });
  }, 1000, status);

  const onClickStart = useCallback((status: Status) => {
    if (status !== Status.Tick) {
      dispatch({ type: Action.Ready });
    } else {
      dispatch({ type: Action.Pause });
    }
  }, []);

  const onClickReset = useCallback(() => {
    dispatch({ type: Action.Reset });
  }, []);

  return (
    <div className="container">
      <CountContext.Provider value={{count, workType}}>
        <TimeCounterCom />
      </CountContext.Provider>
      <TodayCountContext.Provider value={todayCount}>
        <TodayCountCom />
      </TodayCountContext.Provider>
      <StatusContext.Provider value={onClickStart}>
        <OperactionCom status={status} />
      </StatusContext.Provider>
      <ResetContext.Provider value={onClickReset}>
        <RefreshCom />
      </ResetContext.Provider>
    </div>
  );
}

export default App;