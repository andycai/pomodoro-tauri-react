import RefreshCircleIcon from "mdi-react/RefreshCircleIcon"
import { memo } from "react"
import { useCountStore } from "../store/store"
import { Status, WorkType } from "../config"

function RefreshCom() {
    console.log("render refresh")
    const reset = useCountStore((state) => state.reset)
    const status = useCountStore((state) => state.status)
    const workType = useCountStore((state) => state.workType)

    return (
      <>
      {
        status === Status.Pause || workType === WorkType.Break ? <RefreshCircleIcon className="cursor-pointer" size={24} onClick={reset} /> : ""
      }
      </>
    )
}

export default memo(RefreshCom)