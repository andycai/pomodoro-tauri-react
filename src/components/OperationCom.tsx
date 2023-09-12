import PauseCircleOutlineIcon from "mdi-react/PauseCircleOutlineIcon"
import PlayCircleOutlineIcon from "mdi-react/PlayCircleOutlineIcon"
import { memo, useEffect } from "react"
import { useCountStore } from "../store/store"
import { Status } from "../config"
import { useAudio } from "../utils"

function OperactionCom() {
  console.log("render Operaction")
  const status = useCountStore((state) => state.status)
  const tick = useCountStore((state) => state.tick)
  const className = "cursor-pointer"

  useEffect(() => {
    if (status === Status.Tick) {
      useAudio()?.play()
    } else {
      if (useAudio()) {
        useAudio().currentTime = 0
        useAudio().pause()
      }
    }
  }, [status])

  return (
    <>
      {
        (status === Status.Tick)  ?
          (<PauseCircleOutlineIcon className={className} size={24} onClick={tick} />)
        :
          (<PlayCircleOutlineIcon className={className} size={24} onClick={tick} />)
      }
    </>
  )
}

export default memo(OperactionCom)