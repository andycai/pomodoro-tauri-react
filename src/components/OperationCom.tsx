import PauseCircleOutlineIcon from "mdi-react/PauseCircleOutlineIcon"
import PlayCircleOutlineIcon from "mdi-react/PlayCircleOutlineIcon"
import { memo, useEffect } from "react"
import { useCountStore } from "../store/store"
import { Status } from "../config"
import { useAudio } from "../hooks/useAudio"

function OperactionCom() {
  console.log("render Operaction")
  const status = useCountStore((state) => state.status)
  const tick = useCountStore((state) => state.tick)
  const className = "cursor-pointer"
  const [playing, toggle] = useAudio("resource/dida.mp3")

  useEffect(() => {
    toggle()
  }, [playing])

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