import { memo, useContext, useMemo, useState } from "react";
import { WorkType } from "../enum";
import { WorkTypeContext } from "../utils";

function convertTitle(type: WorkType) {
  switch (type) {
    case WorkType.Work:
      return "Work";
    case WorkType.Break:
      return "Break";
  }
}

function WorkTypeCom() {
  const workType = useContext(WorkTypeContext)
  console.info("render Work Type");
  const [className, setClassName] = useState("");
  useMemo(() => {
    setClassName(workType === WorkType.Work ? "mt-2 text-red-600 text-sm font-bold text-center" : "mt-1 text-green-600 text-sm font-bold text-center");
  }, [workType])
  return (
    <h4 className={className}>- {convertTitle(workType)} -</h4>
  );
}

export default memo(WorkTypeCom);