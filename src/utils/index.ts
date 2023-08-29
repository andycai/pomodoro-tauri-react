import { createContext } from "react";
import { Status, WorkType } from "../enum";

export const CountContext = createContext(
  0
);

export const WorkTypeContext = createContext(
  WorkType.Work 
);

export const StatusContext = createContext(
  Status.Idle
);

export const StatusCbContext = createContext(
  (status: Status) => { status }
);

export const ResetContext = createContext(
  () => {}
);

export const TodayCountContext = createContext(
   0 
);
