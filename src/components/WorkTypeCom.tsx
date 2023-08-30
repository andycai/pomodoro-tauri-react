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
  const [className, setClassName] = useState("title work-color");
  useMemo(() => {
    setClassName(workType === WorkType.Work ? "title work-color" : "title break-color");
  }, [workType])
  return (
    <h4 className={className}>- {convertTitle(workType)} -</h4>
  );
}

export default memo(WorkTypeCom);