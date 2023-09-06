import { useCountStore } from "../store/store";
import { convertTimeString } from "../utils";

function TimeCounterCom() {
  const count = useCountStore((state) => state.count);
  console.log("render TimeCounter");
  const className = "antialiased text-8xl font-black text-center ";

  return (
    <h1 className={className}>{convertTimeString(count)}</h1>
  );
}

export default TimeCounterCom;