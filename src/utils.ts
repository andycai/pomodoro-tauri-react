import { ONE_MINUTE } from "./config";

export const convertTimeString = (count: number) : string => {
  return (`${Math.floor(count / ONE_MINUTE)}:${Math.floor(count % ONE_MINUTE) < 10 ? "0" : ""}${count % ONE_MINUTE}`)
}

let audioEle: HTMLAudioElement

export const updateAudio = (audio: HTMLAudioElement) => {
  audioEle = audio
}

export const useAudio = (): HTMLAudioElement => {
  return audioEle
}