import { memo, useCallback } from "react"
import { useCountStore } from "../store/store"
import { changeAudio, playAudio } from "../utils"
import { WorkType } from "../config"
import CoffeeOutlineIcon from "mdi-react/CoffeeOutlineIcon"
import ClockOutlineIcon from "mdi-react/ClockOutlineIcon"

function TodayCountCom() {
    const today = useCountStore((state) => state.today)
    const total = useCountStore((state) => state.total)
    const workType = useCountStore((state) => state.workType)

    // const className = "absolute bottom-1 left-1 flex align-bottom"
    const className = "flex flex-row flex-none ml-2"
    console.log("render today count: ", today, total)

    const onClick = useCallback(() => {
      playAudio(changeAudio())
    }, [])

    return (
      <div className={className}>
        {
          workType === WorkType.Work ? <ClockOutlineIcon size={24} onClick={onClick} /> : <CoffeeOutlineIcon size={24}  onClick={onClick} />
        }
        <span className="text-xs pt-2" >{total}/{today}</span>
      </div>
    )
}

export default memo(TodayCountCom)