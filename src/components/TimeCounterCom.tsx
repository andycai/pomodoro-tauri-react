import { useContext, useMemo, useState } from "react";
import { CountContext, WorkTypeContext } from "../utils";
import { WorkType } from "../enum";

const ONE_MINUTE = 60;

function convertCount(count: number) : string {
  return (`${Math.floor(count / ONE_MINUTE)}:${Math.floor(count % ONE_MINUTE) < 10 ? "0" : ""}${count % ONE_MINUTE}`);
}

function TimeCounterCom() {
  const count = useContext(CountContext);
  const [className, setClassName] = useState("");
  const workType = useContext(WorkTypeContext);
  console.info("render TimeCounter");

  useMemo(() => {
    setClassName(workType === WorkType.Work ? "antialiased text-red-600 text-7xl font-black text-center" : "antialiased text-green-600 text-7xl font-black text-center");
  }, [workType]);

  return (
    <h1 className={className}>{convertCount(count)}</h1>
  );
}

export default TimeCounterCom;