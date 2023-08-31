import RefreshCircleIcon from "mdi-react/RefreshCircleIcon";
import { memo, useContext } from "react";
import { ResetContext } from "../utils";

function RefreshCom() {
    const onClickReset = useContext(ResetContext);

    console.info("render refresh");
    return (
      <RefreshCircleIcon className="cursor-pointer absolute top-1 right-1" size={22} onClick={onClickReset} />
    );
}

export default memo(RefreshCom);