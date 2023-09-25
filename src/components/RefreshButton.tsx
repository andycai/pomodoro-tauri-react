import { memo } from "react"
import { useStore } from "../store/store"
import { Status, WorkType } from "../config"
import { Refresh } from "../icons/refresh"

function RefreshButton() {
    console.log("render refresh")
    const reset = useStore((state) => state.reset)
    const status = useStore((state) => state.status)
    const workType = useStore((state) => state.workType)

    return (
      <button className="flex flex-row justify-end basis-1/4" title="Reset" onClick={reset}>
      {
        status === Status.Pause || workType === WorkType.Break ? <Refresh width={16} height={16} /> : ""
      }
      </button>
    )
}

export default memo(RefreshButton)