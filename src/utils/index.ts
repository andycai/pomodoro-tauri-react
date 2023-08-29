import { createContext } from "react";
import { Status, WorkType } from "../enum";

export const CountContext = createContext({
  count:0, 
  workType:WorkType.Work, 
});

// export const StatusContext = createContext({
//   status: Status.Idle, 
//   onClickStart: () => { },
// });

export const StatusContext = createContext(
  (status: Status) => { status },
);

export const ResetContext = createContext(
  () => { },
);

export const TodayCountContext = createContext(
   0 
);
