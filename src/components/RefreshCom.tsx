import RefreshCircleIcon from "mdi-react/RefreshCircleIcon";
import { memo } from "react";
import { useCountStore } from "../store/store";

function RefreshCom() {
    console.log("render refresh");
    const reset = useCountStore((state) => state.reset);

    return (
      <RefreshCircleIcon className="cursor-pointer" size={24} onClick={reset} />
    );
}

export default memo(RefreshCom);