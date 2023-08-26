import PauseCircleOutlineIcon from "mdi-react/PauseCircleOutlineIcon";
import PlayCircleOutlineIcon from "mdi-react/PlayCircleOutlineIcon";
import { Status } from "../enum";

function OperationButtonCom(props: any) {
    return (props.data === Status.Tick) ? <PauseCircleOutlineIcon className="icon" size={26} onClick={props.onClick} /> : <PlayCircleOutlineIcon className="icon" size={26} onClick={props.onClick} />;
}

function OperactionCom(props: any) {
  console.info("render Operaction");
  return (
    <div className="start-op">
      <OperationButtonCom data={props.data} onClick={props.onClick} />
    </div>
  );
}

export default OperactionCom;