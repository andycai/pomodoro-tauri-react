import RefreshCircleIcon from "mdi-react/RefreshCircleIcon";

function RefreshCom(props: any) {
    return (
      <div className="reset-op">
        <RefreshCircleIcon className="icon" size={26} onClick={props.onClick} />
      </div>
    );
}

export default RefreshCom;