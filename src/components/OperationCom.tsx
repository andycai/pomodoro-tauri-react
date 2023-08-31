import PauseCircleOutlineIcon from "mdi-react/PauseCircleOutlineIcon";
import PlayCircleOutlineIcon from "mdi-react/PlayCircleOutlineIcon";
import { Status } from "../enum";
import { memo, useContext } from "react";
import { StatusCbContext, StatusContext } from "../utils";

function OperactionCom() {
  const status = useContext(StatusContext);
  const onClickStart = useContext(StatusCbContext);
  console.info("render Operaction");
  const className = "cursor-pointer absolute bottom-1 right-1";

  return (
    <>
      {
        (status === Status.Tick)  ?
          (<PauseCircleOutlineIcon className={className} size={22} onClick={() => onClickStart(status)} />)
        :
          (<PlayCircleOutlineIcon className={className} size={22} onClick={() => onClickStart(status)} />)
      }
    </>
  );
}

export default memo(OperactionCom);