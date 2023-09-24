import { memo, useEffect } from "react"
import { useCountStore } from "../store/store"
import { Status } from "../config"
import { playAudio, playEndAudio } from "../utils"
import { Pause } from "../icons/pause"
import { Play } from "../icons/play"

function OperationButton() {
  console.log("render Operaction")
  const status = useCountStore((state) => state.status)
  const tick = useCountStore((state) => state.tick)

  useEffect(() => {
    playAudio(status === Status.Tick)
    playEndAudio(status === Status.Idle)
  }, [status])

  return (
    <button className="flex flex-row justify-center basis-1/2" title="Play or Pause" onClick={tick} >
      {
        (status === Status.Tick)  ? <Pause width={22} height={22} /> : <Play width={22} height={22} />
      }
    </button>
  )
}

export default memo(OperationButton)