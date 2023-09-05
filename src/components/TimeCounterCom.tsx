import { useCountStore } from "../store/store";
import { WorkType } from "../config";
import { convertTimeString } from "../utils";

function TimeCounterCom() {
  const [count, workType] = useCountStore((state) => [state.count, state.workType]);
  console.log("render TimeCounter", workType);
  const s = "antialiased text-8xl font-black text-center ";

  return (
    <h1 className={`${workType === WorkType.Work ? s+"text-red-600" : s+"text-green-600"}`}>{convertTimeString(count)}</h1>
  );
}

export default TimeCounterCom;