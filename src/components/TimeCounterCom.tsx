import { useContext } from "react";
import { CountContext } from "../utils";

const ONE_MINUTE = 60;

function convertCount(count: number) : string {
  return (`${Math.floor(count / ONE_MINUTE)}:${Math.floor(count % ONE_MINUTE) < 10 ? "0" : ""}${count % ONE_MINUTE}`);
}

function TimeCounterCom() {
  const count = useContext(CountContext)
  console.info("render TimeCounter");
  return (
    <h1 className="time">{convertCount(count)}</h1>
  );
}

export default TimeCounterCom;