import { memo } from "react";
import { useCountStore } from "../store/store";
import { WorkType } from "../config";
import LaptopIcon from "mdi-react/LaptopIcon";
import CoffeeOutlineIcon from "mdi-react/CoffeeOutlineIcon";

function WorkTypeCom() {
  const workType = useCountStore((state) => state.workType);
  console.log("render Work Type", workType);
  const className = "absolute bottom-1 right-1";

  return (
    <>
    {
      workType === WorkType.Work ? <LaptopIcon size={24} className={className} /> : <CoffeeOutlineIcon size={24} className={className} />
    }
    </>
  );
}

export default memo(WorkTypeCom);