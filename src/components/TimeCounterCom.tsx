import { memo } from "react";
import { useCountStore } from "../store/store";
import { convertMinuteString, convertSecondString } from "../utils";

function TimeCounterCom() {
  const count = useCountStore((state) => state.count);
  console.log("render TimeCounter", count);
  const className = "antialiased text-8xl font-black text-center ";

  return (
    <>
      <h1 className={className}>{convertMinuteString(count)}</h1>
      <h1 className={className}>{convertSecondString(count)}</h1>
    </>
  );
}

export default memo(TimeCounterCom);