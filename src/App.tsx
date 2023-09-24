import { useEffect, useMemo, useRef } from "react"
import TimeCounter from "./components/TimeCounter"
import { resolveResource } from "@tauri-apps/api/path"
import { readTextFile } from "@tauri-apps/api/fs"
import { useCountStore } from "./store/store"
import { DefaultWorkDuration, INTERVAL, Keys, Status, Tasks, dataJsonURL, diAudioPaths, endAudioPaths } from "./config"
import { getIntDefault, initItem, saveItem } from "./store/local"
import { ClassContainer, TextColors } from "./style"
import { convertFileSrc } from "@tauri-apps/api/tauri"
import { addAudio, addEndAudio } from "./utils"
import Appbar from "./components/AppBar"
import Footbar from "./components/FootBar"

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
  const [status, today, total, workType, daykey, theme] = useCountStore((state) => [state.status, state.today, state.total, state.workType, state.daykey, state.theme])
  const updateDaykey = useCountStore((state) => state.updateDaykey)
  const updateToday = useCountStore((state) => state.updateToday)
  const initData = useCountStore((state) => state.initData)
  const countdown = useCountStore((state) => state.countdown)

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
        saveItem(daykey, today.toString()) // 保存到 localStorage
      } else {
        updateDaykey(Keys.today())
        updateToday(1) // 隔天更新
      }
    }
  }, [today])

  useEffect(() => {
    if (total > 0) {
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

      for (const v of diAudioPaths) {
        // console.log("path: ", v)
        const audioPath = await resolveResource(v)
        const audio = new Audio(convertFileSrc(audioPath))
        audio.loop = true
        addAudio(v, audio)
      }

      for (const v of endAudioPaths) {
        const audioPath = await resolveResource(v)
        addEndAudio(v, new Audio(convertFileSrc(audioPath)))
      }
    }, []
  )

  useInterval(() => {
    countdown()
  }, INTERVAL, status)

  // 字体和图标颜色
  const className = useMemo(() => {
    const arr = TextColors[workType]??TextColors[1]
    const color = arr[theme]??arr[4]
    return ClassContainer + color 
  }, [theme, workType])

  return (
    <div className={className}>
      <Appbar />
      <TimeCounter />
      <Footbar />
    </div>
  )
}

export default App