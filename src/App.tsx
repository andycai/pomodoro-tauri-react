import { useReducer } from "react";
import { resolveResource } from "@tauri-apps/api/path";
import { readTextFile } from "@tauri-apps/api/fs";
import PlayCircleOutlineIcon from "mdi-react/PlayCircleOutlineIcon"
import PauseCircleOutlineIcon from "mdi-react/PauseCircleOutlineIcon"
import RefreshCircleIcon from "mdi-react/RefreshCircleIcon"
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

let ICON_PLAY = "play-circle-outline";
let ICON_PAUSE = "pause-circle-outline";

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
  icon: ICON_PLAY,
}

function workReducer(state: any, action: any) {
  switch (action.type) {
    case Action.Pause:
      clearInterval(ticker);
      return {
        ...state,
        status: Status.Pause,
        icon: ICON_PLAY,
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
        icon: ICON_PLAY,
      };
    case Action.Ready:
      return {
        ...state,
        status: Status.Tick,
        icon: ICON_PAUSE,
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
          icon: ICON_PLAY,
        }
      } else {
        return {
          ...state,
          status: Status.Tick,
          count: action.count,
          showCount: convertCount(action.count),
          icon: ICON_PAUSE,
        }
      }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(workReducer, initialState);
  const {title, showCount, status} = state;

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

  function SubIcon() {
    if (state.icon === ICON_PAUSE) {
      return <PauseCircleOutlineIcon className="icon" size={26} onClick={clickStart} />;
    } else {
      return <PlayCircleOutlineIcon className="icon" size={26} onClick={clickStart} />;
    }
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
        <SubIcon /> 
      </div>
      <div className="reset-op">
        <RefreshCircleIcon className="icon" size={26} onClick={clickReset} />
      </div>
    </div>
  );
}

export default App;