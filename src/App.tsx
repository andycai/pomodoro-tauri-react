import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import "./App.css";
import { Action, LoadDataStatus, Status, WorkType } from "./enum"
import TimeCounterCom from "./components/TimeCounterCom";
import OperactionCom from "./components/OperationCom";
import TodayCountCom from "./components/TodayCountCom";
import RefreshCom from "./components/RefreshCom";
import { resolveResource } from "@tauri-apps/api/path";
import { readTextFile } from "@tauri-apps/api/fs";
import { CountContext, ResetContext, StatusCbContext, StatusContext, TodayCountContext, WorkTypeContext } from "./utils";
import WorkTypeCom from "./components/WorkTypeCom";

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

function saveLocalTodayCount(count: number) {
  localStorage.setItem(convertDate(), count.toString());
}

const initialState = {
  count: defaultWorkDuration(),
  status: Status.Idle,
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
      const {count, workType, todayCount} = action.payload;
      if (count < 0) {
        if (workType === WorkType.Work) { // 完成工作
          saveLocalTodayCount(todayCount + 1);
          return {
            ...state,
            count: defaultBreakDuration(),
            status: Status.Idle,
            todayCount: todayCount + 1, // 今天番茄钟数+1
            workType: WorkType.Break,
          }
        } else { // 完成休息
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
        count: count,
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
  return (
    <div className="container">
      <ContextContainer>
        <WorkTypeCom />
        <TimeCounterCom />
        <TodayCountCom />
        <OperactionCom />
        <RefreshCom />
      </ContextContainer>
    </div>
  );
}

const ContextContainer = (props: any) => {
  const [state, dispatch] = useReducer(workReducer, initialState);
  const {count, status, todayCount, workType} = state;
  const [loaded, setLoaded] = useState<LoadDataStatus>(LoadDataStatus.Idle);

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
      setLoaded(LoadDataStatus.Loading);
      const resourcePath = await resolveResource("resources/data.json");
      const data = JSON.parse(await readTextFile(resourcePath));

      if (localStorage.getItem("defaultWorkDuration") === null) {
        localStorage.setItem("defaultWorkDuration", data.defaultWorkDuration().toString());
      }

      if (localStorage.getItem("defaultBreakDuration") === null) {
        localStorage.setItem("defaultBreakDuration", data.defaultBreakDuration.toString());
      }

      state.todayCount = getLocalTodayCount();
      setLoaded(LoadDataStatus.Loaded);
    }, []
  );

  useInterval(() => {
    dispatch({
      type: Action.Tick, 
      payload: {
        count: count - 1, 
        workType: workType, 
        todayCount: todayCount
      }
    });
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
    <ResetContext.Provider value={onClickReset}>
      <TodayCountContext.Provider value={todayCount}>
        <StatusCbContext.Provider value= {onClickStart}>
          <StatusContext.Provider value= {status}>
            <WorkTypeContext.Provider value={workType}>
              <CountContext.Provider value={count}>
                {props.children}
              </CountContext.Provider>
            </WorkTypeContext.Provider>
          </StatusContext.Provider>
        </StatusCbContext.Provider>
      </TodayCountContext.Provider>
    </ResetContext.Provider>
  )
}

export default App;