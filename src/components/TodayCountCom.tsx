import ClockOutlineIcon from "mdi-react/ClockOutlineIcon";
import { TodayCountContext } from "../utils";
import { memo, useContext } from "react";

function TodayCountCom() {
    const todayCount = useContext(TodayCountContext);

    console.info("render today count");
    return (
      <div className="absolute top-1 left-1 flex align-bottom">
        <ClockOutlineIcon className="" size={22} />
        <span className="text-xs pt-1">x{todayCount}</span>
      </div>
    );
}

export default memo(TodayCountCom);