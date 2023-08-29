import { memo, useContext } from "react";
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
  return (
    <h4 className="title">{convertTitle(workType)}</h4>
  );
}

export default memo(WorkTypeCom);