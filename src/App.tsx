import { useEffect, useMemo, useRef } from "react"
import TimeCounterCom from "./components/TimeCounterCom"
import OperactionCom from "./components/OperationCom"
import TodayCountCom from "./components/TodayCountCom"
import RefreshCom from "./components/RefreshCom"
import { resolveResource } from "@tauri-apps/api/path"
import { readTextFile } from "@tauri-apps/api/fs"
import { useCountStore } from "./store/store"
import { DefaultWorkDuration, INTERVAL, Keys, Status, Tasks, dataJsonURL, diAudioes, endAudioes } from "./config"
import { getIntDefault, initItem, saveItem } from "./store/local"
import { ClassContainer, TextColors } from "./style"
import { convertFileSrc } from "@tauri-apps/api/tauri"
import { addAudio, addEndAudio } from "./utils"

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

function useAsyncEffect(effect: () => Promise<void | (() => void)>, deps?: any[]) {
  return useEffect(
    () => {
      const cleanupPromise = effect()
      return () => { cleanupPromise.then(cleanup => cleanup && cleanup()) }
    },
    deps
  )
}

function App() {
  console.log("render App")
  const [status, today, total, workType, daykey] = useCountStore((state) => [state.status, state.today, state.total, state.workType, state.daykey])
  const updateDaykey = useCountStore((state) => state.updateDaykey)
  const updateToday = useCountStore((state) => state.updateToday)
  const initData = useCountStore((state) => state.initData)
  const countdown = useCountStore((state) => state.countdown)
  // const updateAudio = useCountStore((state) => state.updateAudio)

  useEffect(() => {
      initData(
        getIntDefault(Keys.today(), 0),
        getIntDefault(Keys.total(Tasks.default), 0),
        getIntDefault(Keys.defaultWorkDuration, DefaultWorkDuration)
      )
  }, [])

  useEffect(() => {
    if (today > 0) {
      if (daykey === Keys.today()) { // 当天
        // console.log("today: ", today)
        saveItem(daykey, today.toString()) // 保存到 localStorage
      } else {
        // console.log("today2: ", today)
        updateDaykey(Keys.today())
        updateToday(1) // 隔天更新
      }
    }
  }, [today])

  useEffect(() => {
    if (total > 0) {
      // console.log("total: ", total)
      saveItem(Keys.total(Tasks.default), total.toString()) // 保存到 localStorage
    }
  }, [total])

  // 加载配置数据
  useAsyncEffect(
    async () => {
      const resourcePath = await resolveResource(dataJsonURL)
      const data = JSON.parse(await readTextFile(resourcePath))
      initItem(Keys.defaultWorkDuration, data.defaultWorkDuration.toString())
      initItem(Keys.defaultBreakDuration, data.defaultBreakDuration.toString())

      for (let v of diAudioes) {
        const audioPath = await resolveResource(v)
        const audio = new Audio(convertFileSrc(audioPath))
        audio.loop = true
        addAudio(audio)
      }

      for (let v of endAudioes) {
        const audioPath = await resolveResource(v)
        addEndAudio(new Audio(convertFileSrc(audioPath)))
      }
    }, []
  )

  useInterval(() => {
    countdown()
  }, INTERVAL, status)

  // 字体和图标颜色
  const className = useMemo(() => {
    const index = Math.floor(today / 4)
    const arr = TextColors[workType]??TextColors[1]
    const color = arr[index]??arr[4]
    // console.log("color", index, color)
    return ClassContainer + color 
  }, [today, workType])

  return (
    <div className={className}>
      <div className="flex flex-col">
        <TimeCounterCom />
        <div className="flex flex-row justify-center mt-2">
          <TodayCountCom />
          <div className="flex flex-row flex-1 grow justify-end space-x-1 mr-2">
            <RefreshCom />
            <OperactionCom />
            {/* <WorkTypeCom /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App