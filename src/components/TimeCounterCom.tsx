import { useCountStore } from "../store/store";
import { ONE_MINUTE, WorkType } from "../config";

function convertCount(count: number) : string {
  return (`${Math.floor(count / ONE_MINUTE)}:${Math.floor(count % ONE_MINUTE) < 10 ? "0" : ""}${count % ONE_MINUTE}`);
}

function TimeCounterCom() {
  const [count, workType] = useCountStore((state) => [state.count, state.workType]);
  console.info("render TimeCounter", workType);

  return (
    <h1 className={`${workType === WorkType.Work ? "antialiased text-red-600 text-7xl font-black text-center" : "antialiased text-green-600 text-7xl font-black text-center"}`}>{convertCount(count)}</h1>
  );
}

export default TimeCounterCom;