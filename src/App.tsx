import { useEffect, useRef, useState } from "react";
import TimeCounterCom from "./components/TimeCounterCom";
import OperactionCom from "./components/OperationCom";
import TodayCountCom from "./components/TodayCountCom";
import RefreshCom from "./components/RefreshCom";
import { resolveResource } from "@tauri-apps/api/path";
import { readTextFile } from "@tauri-apps/api/fs";
import WorkTypeCom from "./components/WorkTypeCom";
import { useCountStore } from "./store/store";
import { LoadDataStatus, Status } from "./config";

function convertDate() {
  const date = new Date();
  const key = `PomodoroTodayCount-${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`;

  return key;
}

function getLocalToday() {
  // console.log("getLocalToday: ", localStorage.getItem(convertDate()));
  if (localStorage.getItem(convertDate()) === null) {
    localStorage.setItem(convertDate(), "0");
  }
  return Number(localStorage.getItem(convertDate()));
}

function saveLocalTodayCount(count: number) {
  localStorage.setItem(convertDate(), count.toString());
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
  const [status, today] = useCountStore((state) => [state.status, state.today]);
  const updateToday = useCountStore((state) => state.updateToday);
  const updateCount = useCountStore((state) => state.updateCount);
  const updateDefaultWorkDuration = useCountStore((state) => state.updateDefaultWorkDuration);
  const updateDefaultBreakDuration = useCountStore((state) => state.updateDefaultBreakDuration);
  const countdown = useCountStore((state) => state.countdown);
  const [loaded, setLoaded] = useState<LoadDataStatus>(LoadDataStatus.Idle);

  useEffect(() => {
    // console.log("today: ", today);
    if (today > 0) {
      saveLocalTodayCount(today); // 保存到 localStorage
    }
  }, [today]);

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
      updateToday(getLocalToday());

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

      updateDefaultWorkDuration(Number(localStorage.getItem("defaultWorkDuration")));
      updateDefaultBreakDuration(Number(localStorage.getItem("defaultBreakDuration")));
      updateCount(Number(localStorage.getItem("defaultWorkDuration")));

      setLoaded(LoadDataStatus.Loaded);
    }, []
  );

  useInterval(() => {
    countdown();
  }, 1000, status);

  return (
    <div className="h-screen w-screen font-sans select-none cursor-default text-white bg-neutral-800">
      <div className="flex flex-col">
        <WorkTypeCom />
        <TimeCounterCom />
      </div>
      <TodayCountCom />
      <OperactionCom />
      <RefreshCom />
    </div>
  );
}

export default App;