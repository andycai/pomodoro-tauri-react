import { useEffect, useRef, useState } from "react"
import TimeCounterCom from "./components/TimeCounterCom"
import OperactionCom from "./components/OperationCom"
import TodayCountCom from "./components/TodayCountCom"
import RefreshCom from "./components/RefreshCom"
import { resolveResource } from "@tauri-apps/api/path"
import { readTextFile } from "@tauri-apps/api/fs"
import WorkTypeCom from "./components/WorkTypeCom"
import { useCountStore } from "./store/store"
import { LoadDataStatus, Status, WorkType } from "./config"
import { getTodayKey, getTotalKey } from "./utils"

/**
 * 获取当天/总的番茄钟数量
 */
function getLocalCount(key: string) {
  console.log("getToday: ", localStorage.getItem(key))
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, "0")
  }

  return Number(localStorage.getItem(key))
}

/**
 * 保存的番茄钟数量：当天|总数
 */
function saveLocalPomodoroCount(key: string, count: number) {
  localStorage.setItem(key, count.toString())
}

function useInterval(callback: any, delay: number, status: Status) {
  const savedCallback = useRef(callback)
  let id: any

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    clearInterval(id)
    function tick() {
      savedCallback.current()
    }
    if (status === Status.Tick) {
      id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [status])
}

function App() {
  console.log("render App")
  const [status, today, total, workType, daykey] = useCountStore((state) => [state.status, state.today, state.total, state.workType, state.daykey])
  const updateDaykey = useCountStore((state) => state.updateDaykey)
  const updateToday = useCountStore((state) => state.updateToday)
  const updateTotal = useCountStore((state) => state.updateTotal)
  const updateCount = useCountStore((state) => state.updateCount)
  const updateDefaultWorkDuration = useCountStore((state) => state.updateDefaultWorkDuration)
  const updateDefaultBreakDuration = useCountStore((state) => state.updateDefaultBreakDuration)
  const countdown = useCountStore((state) => state.countdown)
  const [loaded, setLoaded] = useState<LoadDataStatus>(LoadDataStatus.Idle)

  useEffect(() => {
    if (today > 0) {
      if (daykey === getTodayKey()) { // 当天
        saveLocalPomodoroCount(daykey, today) // 保存到 localStorage
      } else {
        updateDaykey(getTodayKey())
        updateToday(1) // 隔天更新
      }
    }
  }, [today])

  useEffect(() => {
    if (total > 0) {
      console.log("total: ", total)
      saveLocalPomodoroCount(getTotalKey("default"), total) // 保存到 localStorage
    }
  }, [total])

  function useAsyncEffect(effect: () => Promise<void | (() => void)>, deps?: any[]) {
    return useEffect(
      () => {
        const cleanupPromise = effect()
        return () => { cleanupPromise.then(cleanup => cleanup && cleanup()) }
      },
      deps
    )
  }

  useAsyncEffect(
    async () => {
      updateToday(getLocalCount(getTodayKey()))
      updateTotal(getLocalCount(getTotalKey("default")))

      if (loaded !== LoadDataStatus.Idle) return
      setLoaded(LoadDataStatus.Loading)
      const resourcePath = await resolveResource("resources/data.json")
      const data = JSON.parse(await readTextFile(resourcePath))

      if (localStorage.getItem("defaultWorkDuration") === null) {
        localStorage.setItem("defaultWorkDuration", data.defaultWorkDuration().toString())
      }

      if (localStorage.getItem("defaultBreakDuration") === null) {
        localStorage.setItem("defaultBreakDuration", data.defaultBreakDuration.toString())
      }

      updateDefaultWorkDuration(Number(localStorage.getItem("defaultWorkDuration")))
      updateDefaultBreakDuration(Number(localStorage.getItem("defaultBreakDuration")))
      updateCount(Number(localStorage.getItem("defaultWorkDuration")))

      setLoaded(LoadDataStatus.Loaded)
    }, []
  )

  useInterval(() => {
    countdown()
  }, 1000, status)

  const s = "h-screen w-screen font-sans select-none cursor-default bg-stone-800 "

  return (
    <div className={`${workType === WorkType.Work ? s+'text-green-600' : s+'text-red-500'}`}>
      <div className="flex flex-col">
        <TimeCounterCom />
        <div className="flex flex-row justify-center">
          <TodayCountCom />
          <div className="flex flex-row flex-1 grow justify-center space-x-1">
            <OperactionCom />
            <RefreshCom />
          </div>
          <WorkTypeCom />
        </div>
      </div>
    </div>
  )
}

export default App