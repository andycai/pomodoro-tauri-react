import { memo } from "react";
import { useCountStore } from "../store/store";
import { convertMinuteString, convertSecondString } from "../utils";

function TimeCounterCom() {
  const count = useCountStore((state) => state.count);
  console.log("render TimeCounter", count);
  // const className = "font-black";

  return (
    <div className="flex flex-col items-center font-black" data-tauri-drag-region>
      <h1 className="text-7xl" data-tauri-drag-region>{convertMinuteString(count)}</h1>
      <h4 className="text-7xl" data-tauri-drag-region>{convertSecondString(count)}</h4>
    </div>
  );
}

export default memo(TimeCounterCom);