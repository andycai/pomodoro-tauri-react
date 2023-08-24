import { useState } from "react";
import { resolveResource } from "@tauri-apps/api/path";
import { readTextFile } from "@tauri-apps/api/fs";
import "./App.css";

enum Status {
  Idle = 0,
  Work = 1,
  Break = 2
}

const ONE_MINUTE = 60;
const resourcePath = await resolveResource("resources/data.json");
const data = JSON.parse(await readTextFile(resourcePath));

if (localStorage.getItem("defaultWorkDuration") === null) {
  localStorage.setItem("defaultWorkDuration", data.defaultWorkDuration.toString());
}

if (localStorage.getItem("defaultBreakDuration") === null) {
  localStorage.setItem("defaultBreakDuration", data.defaultBreakDuration.toString());
}

const defaultWorkDuration = Number(localStorage.getItem("defaultWorkDuration"));
// const workDurationList = data.workDurationList;
const defaultBreakDuration = Number(localStorage.getItem("defaultBreakDuration"));
// const breakDurationList = data.breakDurationList;
let count = defaultWorkDuration;
let starting = false;
let ticker : any;
let nextActionStatus = Status.Work;

console.info("defaultWorkDuration: ", defaultWorkDuration);
console.info("defaultBreakDuration: ", defaultBreakDuration);

/**
 * 转换秒数为显示：分:秒
 */
function convertCount(count: number) : string {
  return (`${Math.floor(count / ONE_MINUTE)}:${Math.floor(count % ONE_MINUTE) < 10 ? "0" : ""}${count % ONE_MINUTE}`);
}

function App() {
  const [title, setTitle] = useState("Work");
  const [countValue, setCountValue] = useState(convertCount(defaultWorkDuration));
  const [buttonName, setButtonName] = useState("Start");

  // useEffect(() => {
  //   ticker = setInterval(() => {
  //     setCount(preCount => preCount - 1);
  //     console.info("left: ", count);
  //   }, 1000);

  //   return ()=> clearInterval(ticker);
  // }, []);

  async function start() {
    if (starting) {
      stop()
      return;
    }
    starting = true;
    setButtonName("Stop");

    ticker = setInterval(() => {
      count -= 1;
      setCountValue(convertCount(count));
      if (count <= 0) {
        stop();
        updateStatus();
      }
    }, 1000);
  }


  /**
   * 改变当前状态
   */
  function updateStatus() {
    if (nextActionStatus === Status.Work) {
      setCountValue(convertCount(defaultBreakDuration));
      setTitle("Break");
      count = defaultBreakDuration;
      nextActionStatus = Status.Break;
    } else {
      setTitle("Work");
      setCountValue(convertCount(defaultWorkDuration));
      count = defaultWorkDuration;
      nextActionStatus = Status.Work;
    }
  }

  /**
   * 停止计时
   */
  function stop() {
    setButtonName("Start");
    starting = false;
    clearInterval(ticker);
  }

  /**
   * 重置计时
   */
  async function reset() {
    setButtonName("Start");
    setCountValue(convertCount(defaultWorkDuration));
    count = defaultWorkDuration;
    starting = false;
    clearInterval(ticker);
  }

  // async function setDefault() {
  //   localStorage.setItem("defaultWorkDuration", workDurationList[2]);
  //   localStorage.setItem("defaultBreakDuration", breakDurationList[0]); 
  // }

  return (
    <div className="container">
      <div className="content">
      <h2 className="title">{title}</h2>
      <h1 className="time">{countValue}</h1>
      </div>
      <div>
      <button type="button" onClick={start}>{buttonName}</button>
      <button type="button" onClick={reset}>Reset</button>
      {/* <button type="button" onClick={setDefault}>Default</button> */}
      </div>
    </div>
  );
}

export default App;
