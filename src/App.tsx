import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { LoadDataStatus, Status, WorkType } from "./enum"
import TimeCounterCom from "./components/TimeCounterCom";
import OperactionCom from "./components/OperationCom";
import TodayCountCom from "./components/TodayCountCom";
import RefreshCom from "./components/RefreshCom";
import { resolveResource } from "@tauri-apps/api/path";
import { readTextFile } from "@tauri-apps/api/fs";

let ticker: any;
let workType = WorkType.Work;

function defaultWorkDuration() {
  return localStorage.getItem("defaultWorkDuration()") === null ? 1500 : Number(localStorage.getItem("defaultWorkDuration"));
}
function defaultBreakDuration() {
  return localStorage.getItem("defaultBreakDuration") === null ? 300 : Number(localStorage.getItem("defaultBreakDuration"));
}

function getDateStr() {
  const date = new Date();
  const key = `todayCount-${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`;

  return key;
}

function getLocalTodayCount() {
  return localStorage.getItem(getDateStr()) === null ? 0 : Number(localStorage.getItem(getDateStr()));
}

function updateLocalTodayCount(count: number) {
  localStorage.setItem(getDateStr(), count.toString());
}

function App() {
  console.info("render App");
  const [count, setCount] = useState(defaultWorkDuration());
  const [status, setStatus] = useState(Status.Idle);
  const [loaded, setLoaded] = useState(LoadDataStatus.Idle);
  const refCount = useRef(defaultWorkDuration());
  const [todayCount, setTodayCount] = useState(getLocalTodayCount());

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

      setTodayCount(getLocalTodayCount());
      setLoaded(LoadDataStatus.Loaded);
      console.info("loadJsonData", data);
    }, []
  );

  useEffect(
    () => {
      //
    }, []
  );

  const counterData = useMemo(() => {
    console.info("counter memo")
    return count;
  }, [count]);

  function tick() {
    setCount((count) => count - 1);
    refCount.current--;
    console.info("ref count", refCount.current);
    if (refCount.current < 0) {
      clearInterval(ticker);
      if (workType == WorkType.Work) {
        setTodayCount((todayCount) => {
          updateLocalTodayCount(todayCount + 1);
          return todayCount + 1
        });
        setCount(defaultBreakDuration());
        refCount.current = defaultBreakDuration();
        workType = WorkType.Break;
      } else {
        setCount(defaultWorkDuration());
        refCount.current = defaultWorkDuration();
        workType = WorkType.Work;
      }
      setStatus(Status.Idle);
    }
  }

  function onClickStart() {
    clearInterval(ticker)
    if (status !== Status.Tick) {
      ticker = setInterval(() => {
        tick();
      }, 1000);
      setStatus(Status.Tick);
    } else {
      setStatus(Status.Idle);
    }
  } 

  function onClickReset() {
    localStorage.setItem("defaultWorkDuration", "5");
    localStorage.setItem("defaultBreakDuration", "2");
    clearInterval(ticker);
    refCount.current = defaultWorkDuration();
    setCount(defaultWorkDuration());
    setStatus(Status.Idle);
    workType = WorkType.Work;
  }

  return (
    <div className="container">
      <TimeCounterCom data={counterData} title={workType === WorkType.Work ? "Work" : "Break"} />
      <TodayCountCom data={todayCount} />
      <OperactionCom data={status} onClick={onClickStart} />
      <RefreshCom onClick={onClickReset} />
    </div>
  );
}

export default App;