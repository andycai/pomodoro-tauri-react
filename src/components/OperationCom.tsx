import PauseCircleOutlineIcon from "mdi-react/PauseCircleOutlineIcon";
import PlayCircleOutlineIcon from "mdi-react/PlayCircleOutlineIcon";
import { Status } from "../enum";
import { memo, useContext } from "react";
import { StatusCbContext, StatusContext } from "../utils";

function OperactionCom() {
  const status = useContext(StatusContext);
  const onClickStart = useContext(StatusCbContext);
  console.info("render Operaction");

  return (
    <div className="start-op">
      {
        (status === Status.Tick)  ?
          (<PauseCircleOutlineIcon className="icon" size={22} onClick={() => onClickStart(status)} />)
        :
          (<PlayCircleOutlineIcon className="icon" size={22} onClick={() => onClickStart(status)} />)
      }
    </div>
  );
}

export default memo(OperactionCom);