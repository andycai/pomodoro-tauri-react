import { useCountStore } from "../store/store";
import { ONE_MINUTE, WorkType } from "../config";

function convertCount(count: number) : string {
  return (`${Math.floor(count / ONE_MINUTE)}:${Math.floor(count % ONE_MINUTE) < 10 ? "0" : ""}${count % ONE_MINUTE}`);
}

function TimeCounterCom() {
  const [count, workType] = useCountStore((state) => [state.count, state.workType]);
  console.log("render TimeCounter", workType);
  const s = "antialiased pt-1 text-7xl font-black text-center ";

  return (
    <h1 className={`${workType === WorkType.Work ? s+"text-red-600" : s+"text-green-600"}`}>{convertCount(count)}</h1>
  );
}

export default TimeCounterCom;