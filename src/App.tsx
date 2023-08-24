import { useReducer } from "react";
import { resolveResource } from "@tauri-apps/api/path";
import { readTextFile } from "@tauri-apps/api/fs";
import "./App.css";

enum Status {
  Idle = 0,
  Pause,
  Tick,
}

enum Action {
  Pause = 1,
  Reset,
  Ready,
  Tick,
}

enum WorkType {
  Work = 1,
  Break,
}

const ONE_MINUTE = 60;
const INTERVAL = 1000;
const resourcePath = await resolveResource("resources/data.json");
const data = JSON.parse(await readTextFile(resourcePath));

if (localStorage.getItem("defaultWorkDuration") === null) {
  localStorage.setItem("defaultWorkDuration", data.defaultWorkDuration.toString());
}

if (localStorage.getItem("defaultBreakDuration") === null) {
  localStorage.setItem("defaultBreakDuration", data.defaultBreakDuration.toString());
}

const defaultWorkDuration = Number(localStorage.getItem("defaultWorkDuration"));
const defaultBreakDuration = Number(localStorage.getItem("defaultBreakDuration"));
let ticker : any;
let globalCount = defaultWorkDuration;
let globalWorkType = WorkType.Work;

/**
 * 转换秒数为显示：分:秒
 */
function convertCount(count: number) : string {
  return (`${Math.floor(count / ONE_MINUTE)}:${Math.floor(count % ONE_MINUTE) < 10 ? "0" : ""}${count % ONE_MINUTE}`);
}

const initialState = {
  title: "Work",
  showCount: convertCount(defaultWorkDuration),
  status: Status.Idle,
  buttonName: "Start",
}

function workReducer(state: any, action: any) {
  switch (action.type) {
    case Action.Pause:
      clearInterval(ticker);
      return {
        ...state,
        status: Status.Pause,
        buttonName: "Start",
      };
    case Action.Reset:
      clearInterval(ticker);
      globalCount = defaultWorkDuration;
      return {
        ...state,
        status: Status.Idle,
        title: "Work",
        type: WorkType.Work,
        showCount: convertCount(defaultWorkDuration),
        buttonName: "Start",
      };
    case Action.Ready:
      return {
        ...state,
        status: Status.Tick,
        buttonName: "Pause",
      }
    case Action.Tick:
      if (action.count < 0) {
        clearInterval(ticker);
        if (action.workType === WorkType.Work) {
          globalCount = defaultWorkDuration;
          state.title = "Work";
          state.showCount = convertCount(globalCount);
        } else {
          globalCount = defaultBreakDuration;
          state.title = "Break";
          state.showCount = convertCount(globalCount);
        }
        return {
          ...state,
          status: Status.Idle,
          buttonName: "Start",
        }
      } else {
        return {
          ...state,
          status: Status.Tick,
          count: action.count,
          showCount: convertCount(action.count),
          buttonName: "Pause",
        }
      }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(workReducer, initialState);
  const {title, showCount, status, buttonName} = state;

  async function clickStart() {
    if (status === Status.Tick) {
      dispatch({type: Action.Pause});
    } else {
      dispatch({type: Action.Ready});
      clearInterval(ticker);
      ticker = setInterval(() => {
        globalCount -= 1;
        if (globalCount < 0) {
          globalWorkType = ((globalWorkType === WorkType.Work) ? WorkType.Break : WorkType.Work);
        }
        dispatch({type: Action.Tick, count: globalCount, workType: globalWorkType});
      }, INTERVAL);
    }
  }

  async function clickReset() {
    dispatch({type: Action.Reset});
  }

  // async function setDefault() {
  //   localStorage.setItem("defaultWorkDuration", "10");
  //   localStorage.setItem("defaultBreakDuration", "5"); 
  // }

  return (
    <div className="container">
      <div className="content">
        <h4 className="title">{title}</h4>
        <h1 className="time">{showCount}</h1>
      </div>
      <div className="start-op">
        <button type="button" onClick={clickStart}>{buttonName}</button>
      </div>
      <div style={{display:status !== Status.Idle?"block":"none"}} className="reset-op">
        <button type="button" onClick={clickReset}>Reset</button>
      {/* <button type="button" onClick={setDefault}>Default</button> */}
      </div>
    </div>
  );
}

export default App;