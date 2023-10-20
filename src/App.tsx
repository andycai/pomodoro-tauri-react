import { useEffect, useMemo, useRef } from "react"
import TimeCounter from "./components/TimeCounter"
import { resolveResource } from "@tauri-apps/api/path"
import { readTextFile } from "@tauri-apps/api/fs"
import { listen } from '@tauri-apps/api/event'
import { useStore } from "./store/store"
import { DefaultWorkDuration, INTERVAL, Keys, Status, Tasks, dataJsonURL, diAudioPaths, endAudioPaths } from "./config"
import { getIntDefault, initItem, saveItem } from "./store/local"
import { convertFileSrc } from "@tauri-apps/api/tauri"
import { addAudio, addEndAudio, convertThemeStyle } from "./utils"
import Appbar from "./components/AppBar"
import Footbar from "./components/FootBar"

interface DurationPayload {
  duration: number,
  break: number,
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
  const [status, workType, theme] = useStore((state) => [state.status, state.workType, state.theme])
  const initData = useStore((state) => state.initData)
  const countdown = useStore((state) => state.countdown)
  const updateDuration = useStore((state) => state.updateDuration)

  useEffect(() => {
      initData(
        getIntDefault(Keys.today(), 0),
        getIntDefault(Keys.total(Tasks.default), 0),
        getIntDefault(Keys.defaultWorkDuration, DefaultWorkDuration)
      )
  }, [])

  // 加载配置数据
  useAsyncEffect(
    async () => {
      const resourcePath = await resolveResource(dataJsonURL)
      const data = JSON.parse(await readTextFile(resourcePath))
      initItem(Keys.defaultWorkDuration, data.defaultWorkDuration.toString())
      initItem(Keys.defaultBreakDuration, data.defaultBreakDuration.toString())

      await listen<DurationPayload>('event-change-duration', (event) => {
        saveItem(Keys.defaultWorkDuration, (event.payload.duration*60).toString())
        updateDuration()
        // console.log("event:%s, payload:%s", event.event, event.payload.duration)
      })

      await listen<DurationPayload>('event-change-break', (event) => {
        saveItem(Keys.defaultBreakDuration, (event.payload.break*60).toString())
        updateDuration()
        // console.log("event:%s, payload:%s", event.event, event.payload.break)
      })

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
  const themeStyle = useMemo(() => {
    return convertThemeStyle(workType, theme)
  }, [theme, workType])

  return (
    <div className={themeStyle}>
      <Appbar />
      <TimeCounter />
      <Footbar />
    </div>
  )
}

export default App