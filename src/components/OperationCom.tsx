import PauseCircleOutlineIcon from "mdi-react/PauseCircleOutlineIcon";
import PlayCircleOutlineIcon from "mdi-react/PlayCircleOutlineIcon";
import { memo } from "react";
import { useCountStore } from "../store/store";
import { Status } from "../config";

function OperactionCom() {
  console.info("render Operaction");
  const status = useCountStore((state) => state.status);
  const tick = useCountStore((state) => state.tick);
  const className = "cursor-pointer absolute bottom-1 right-1";

  return (
    <>
      {
        (status === Status.Tick)  ?
          (<PauseCircleOutlineIcon className={className} size={22} onClick={tick} />)
        :
          (<PlayCircleOutlineIcon className={className} size={22} onClick={tick} />)
      }
    </>
  );
}

export default memo(OperactionCom);