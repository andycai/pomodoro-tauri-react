import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { LoadDataStatus, Status, WorkType } from "./enum"
import TimeCounterCom from "./components/TimeCounterCom";
import OperactionCom from "./components/OperationCom";
import TodayCountCom from "./components/TodayCountCom";
import RefreshCom from "./components/RefreshCom";
import { resolveResource } from "@tauri-apps/api/path";
import { readTextFile } from "@tauri-apps/api/fs";

const ONE_MINUTE = 60;
let ticker: any;

function convertCount(count: number) : string {
  return (`${Math.floor(count / ONE_MINUTE)}:${Math.floor(count % ONE_MINUTE) < 10 ? "0" : ""}${count % ONE_MINUTE}`);
}

function showTitle(type: WorkType) {
  switch (type) {
    case WorkType.Work:
      return "Work";
    case WorkType.Break:
      return "Break";
  }
}

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
  const [todayCount, setTodayCount] = useState(getLocalTodayCount());
  const [workType, setWorkType] = useState(WorkType.Work);

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

  // const counterData = useMemo(() => {
  //   // console.info("counter memo")
  //   return convertCount(count);
  // }, [count]);

  function tick() {
    setCount((count) => {
      if (count === 0) {
        clearInterval(ticker);
        setStatus(Status.Idle);
        if (workType == WorkType.Work) {
          setTodayCount((todayCount) => {
            updateLocalTodayCount(todayCount + 1);
            return todayCount + 1
          });
          setWorkType(WorkType.Break)
          return defaultBreakDuration();
        } else {
          setWorkType(WorkType.Work)
          return defaultWorkDuration();
        }
      } else {
        return count - 1;
      }
    });
  }

  const onClickStart = useCallback(() => {
    clearInterval(ticker)
    if (status !== Status.Tick) {
      ticker = setInterval(() => {
        tick();
      }, 1000);
      setStatus(Status.Tick);
    } else {
      setStatus(Status.Idle);
    }
  }, []);

  const onClickReset = useCallback(() => {
    // localStorage.setItem("defaultWorkDuration", "5");
    // localStorage.setItem("defaultBreakDuration", "2");
    clearInterval(ticker);
    setCount(defaultWorkDuration());
    setStatus(Status.Idle);
    setWorkType(WorkType.Work);
  }, []);

  return (
    <div className="container">
      <TimeCounterCom data={convertCount(count)} title={showTitle(workType)} />
      <TodayCountCom2 data={todayCount} />
      <OperactionCom2 data={status} onClick={onClickStart} />
      <RefreshCom2 onClick={onClickReset} />
    </div>
  );
}

const TodayCountCom2 = React.memo(TodayCountCom);
const OperactionCom2 = React.memo(OperactionCom);
const RefreshCom2 = React.memo(RefreshCom);

export default App;