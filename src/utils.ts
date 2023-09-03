import { ONE_MINUTE } from "./config";

export const convertTimeString = (count: number) : string => {
  return (`${Math.floor(count / ONE_MINUTE)}:${Math.floor(count % ONE_MINUTE) < 10 ? "0" : ""}${count % ONE_MINUTE}`);
}

export const getTodayKey = () => {
  const date = new Date();
  const key = `PomodoroTodayCount-${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`;

  return key;
}