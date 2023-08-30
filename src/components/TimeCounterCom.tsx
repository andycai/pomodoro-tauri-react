import { useContext, useMemo, useState } from "react";
import { CountContext, WorkTypeContext } from "../utils";
import { WorkType } from "../enum";

const ONE_MINUTE = 60;

function convertCount(count: number) : string {
  return (`${Math.floor(count / ONE_MINUTE)}:${Math.floor(count % ONE_MINUTE) < 10 ? "0" : ""}${count % ONE_MINUTE}`);
}

function TimeCounterCom() {
  const count = useContext(CountContext);
  const [className, setClassName] = useState("time work-color");
  const workType = useContext(WorkTypeContext);
  console.info("render TimeCounter");

  useMemo(() => {
    setClassName(workType === WorkType.Work ? "time work-color" : "time break-color");
  }, [workType]);

  return (
    <h1 className={className}>{convertCount(count)}</h1>
  );
}

export default TimeCounterCom;