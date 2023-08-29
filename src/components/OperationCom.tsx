import PauseCircleOutlineIcon from "mdi-react/PauseCircleOutlineIcon";
import PlayCircleOutlineIcon from "mdi-react/PlayCircleOutlineIcon";
import { Status } from "../enum";
import { memo, useContext } from "react";
import { StatusContext } from "../utils";

function OperactionCom(props: any) {
  const onClickStart = useContext(StatusContext);
  console.info("render Operaction");

  return (
    <div className="start-op">
      {
        (props.status === Status.Tick)  ?
          (<PauseCircleOutlineIcon className="icon" size={26} onClick={() => onClickStart(props.status)} />)
        :
          (<PlayCircleOutlineIcon className="icon" size={26} onClick={() => onClickStart(props.status)} />)
      }
    </div>
  );
}

export default memo(OperactionCom);