import RefreshCircleIcon from "mdi-react/RefreshCircleIcon";
import { memo, useContext } from "react";
import { ResetContext } from "../utils";

function RefreshCom() {
    const onClickReset = useContext(ResetContext);

    console.info("render refresh");
    return (
      <div className="reset-op">
        <RefreshCircleIcon className="icon" size={22} onClick={onClickReset} />
      </div>
    );
}

export default memo(RefreshCom);