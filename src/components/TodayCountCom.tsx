import ClockOutlineIcon from "mdi-react/ClockOutlineIcon";
import { memo } from "react";
import { useCountStore } from "../store/store";

function TodayCountCom() {
    const today = useCountStore((state) => state.today);

    console.info("render today count");
    return (
      <div className="absolute top-1 left-1 flex align-bottom">
        <ClockOutlineIcon className="" size={22} />
        <span className="text-xs pt-1">x{today}</span>
      </div>
    );
}

export default memo(TodayCountCom);