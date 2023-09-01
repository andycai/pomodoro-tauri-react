import RefreshCircleIcon from "mdi-react/RefreshCircleIcon";
import { memo } from "react";
import { useCountStore } from "../store/store";

function RefreshCom() {
    console.info("render refresh");
    const reset = useCountStore((state) => state.reset);

    return (
      <RefreshCircleIcon className="cursor-pointer absolute top-1 right-1" size={22} onClick={reset} />
    );
}

export default memo(RefreshCom);