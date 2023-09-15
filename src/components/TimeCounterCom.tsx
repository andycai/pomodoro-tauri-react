import { memo } from "react";
import { useCountStore } from "../store/store";
import { convertMinuteString, convertSecondString } from "../utils";
import { appWindow } from "@tauri-apps/api/window";

function TimeCounterCom() {
  const count = useCountStore((state) => state.count);
  console.log("render TimeCounter", count);
  // const className = "font-black";

  return (
    <div className="flex flex-col items-end font-black" data-tauri-drag-region>
      <h4 className="text-6xl mr-1" onClick={() => appWindow.close()} data-tauri-drag-region>{convertSecondString(count)}</h4>
      <h1 className="text-8xl mr-1" data-tauri-drag-region>{convertMinuteString(count)}</h1>
    </div>
  );
}

export default memo(TimeCounterCom);