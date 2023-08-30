import ClockOutlineIcon from "mdi-react/ClockOutlineIcon";
import { TodayCountContext } from "../utils";
import { memo, useContext } from "react";

function TodayCountCom() {
    const todayCount = useContext(TodayCountContext);

    console.info("render today count");
    return <div className="today-count"><ClockOutlineIcon className="icon" size={22} />x{todayCount}</div>
}

export default memo(TodayCountCom);