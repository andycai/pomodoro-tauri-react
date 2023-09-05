import ClockOutlineIcon from "mdi-react/ClockOutlineIcon"
import { memo } from "react"
import { useCountStore } from "../store/store"

function TodayCountCom() {
    const today = useCountStore((state) => state.today)

    // const className = "absolute bottom-1 left-1 flex align-bottom"
    const className = "flex flex-row ml-2"
    console.log("render today count")
    return (
      <div className={className}>
        <ClockOutlineIcon size={24} />
        <span className="text-xs pt-2">x{today}</span>
      </div>
    )
}

export default memo(TodayCountCom)