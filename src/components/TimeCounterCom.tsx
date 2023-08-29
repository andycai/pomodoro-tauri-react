import { useContext } from "react";
import { WorkType } from "../enum";
import { CountContext } from "../utils";

const ONE_MINUTE = 60;

function convertCount(count: number) : string {
  return (`${Math.floor(count / ONE_MINUTE)}:${Math.floor(count % ONE_MINUTE) < 10 ? "0" : ""}${count % ONE_MINUTE}`);
}

function convertTitle(type: WorkType) {
  switch (type) {
    case WorkType.Work:
      return "Work";
    case WorkType.Break:
      return "Break";
  }
}

function TimeCounterCom() {
  const data = useContext(CountContext)
  console.info("render TimeCounter");
  return (
      <div className="content">
        <h4 className="title">{convertTitle(data.workType)}</h4>
        <h1 className="time">{convertCount(data.count)}</h1>
      </div>
  );
}

export default TimeCounterCom;