import { memo } from "react";
import { useCountStore } from "../store/store";
import { WorkType } from "../config";

function convertTitle(type: WorkType) {
  switch (type) {
    case WorkType.Work:
      return "Work";
    case WorkType.Break:
      return "Break";
  }
}

function WorkTypeCom() {
  const workType = useCountStore((state) => state.workType);
  console.info("render Work Type", workType);

  return (
    <h4 className={`${workType === WorkType.Work ? "mt-2 text-red-600 text-sm font-bold text-center" : "mt-2 text-green-600 text-sm font-bold text-center"}`}>- {convertTitle(workType)} -</h4>
  );
}

export default memo(WorkTypeCom);