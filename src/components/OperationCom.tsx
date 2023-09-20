import PauseCircleOutlineIcon from "mdi-react/PauseCircleOutlineIcon"
import PlayCircleOutlineIcon from "mdi-react/PlayCircleOutlineIcon"
import { memo, useEffect } from "react"
import { useCountStore } from "../store/store"
import { Status } from "../config"
import { playAudio, playEndAudio } from "../utils"

function OperationCom() {
  console.log("render Operaction")
  const status = useCountStore((state) => state.status)
  const tick = useCountStore((state) => state.tick)
  const className = "cursor-pointer"

  useEffect(() => {
    playAudio(status === Status.Tick)
    playEndAudio(status === Status.Idle)
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

export default memo(OperationCom)