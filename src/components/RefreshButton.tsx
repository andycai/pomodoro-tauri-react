import { memo } from "react"
import { useCountStore } from "../store/store"
import { Status, WorkType } from "../config"
import { Refresh } from "../icons/refresh"

function RefreshButton() {
    console.log("render refresh")
    const reset = useCountStore((state) => state.reset)
    const status = useCountStore((state) => state.status)
    const workType = useCountStore((state) => state.workType)

    return (
      <button className="flex flex-row justify-end basis-1/4" title="Reset" onClick={reset}>
      {
        status === Status.Pause || workType === WorkType.Break ? <Refresh width={16} height={16} /> : ""
      }
      </button>
    )
}

export default memo(RefreshButton)