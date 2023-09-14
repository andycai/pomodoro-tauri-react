import { memo, useCallback } from "react"
import { useCountStore } from "../store/store"
import { WorkType } from "../config"
import LaptopIcon from "mdi-react/LaptopIcon"
import CoffeeOutlineIcon from "mdi-react/CoffeeOutlineIcon"
import { changeAudio, playAudio } from "../utils"

function WorkTypeCom() {
  const workType = useCountStore((state) => state.workType)
  console.log("render Work Type", workType)
  // const className = "absolute bottom-1 right-1"
  // const className = "flex flex-row-reverse flex-none mr-2"

  const onClick = useCallback(() => {
    changeAudio()
    playAudio(true)
  }, [])

  return (
    <>
    {
      workType === WorkType.Work ? <LaptopIcon size={24} onClick={onClick} /> : <CoffeeOutlineIcon size={24} />
    }
    </>
  )
}

export default memo(WorkTypeCom)