import { ONE_MINUTE } from "./config";

export const convertMinuteString = (count: number) : string => {
  return (`${Math.floor(count / ONE_MINUTE) < 10 ? "0" : ""}${Math.floor(count / ONE_MINUTE)}`)
}

export const convertSecondString = (count: number) : string => {
  return (`${Math.floor(count % ONE_MINUTE) < 10 ? "0" : ""}${count % ONE_MINUTE}`)
}

export const convertTimeString = (count: number) : string => {
  return (`${Math.floor(count / ONE_MINUTE)}:${Math.floor(count % ONE_MINUTE) < 10 ? "0" : ""}${count % ONE_MINUTE}`)
}

let currentAudioIndex = 0
let currentEndAudioIndex = 0
const audioes: HTMLAudioElement[] = [];
const endAudioes: HTMLAudioElement[] = [];

export const addAudio = (audio: HTMLAudioElement) => {
  audioes.push(audio)
}

export const playAudio = (isPlay: boolean): void => {
  for (let audio of audioes) {
    audio.currentTime = 0 
    audio.pause()
  }
  if (isPlay) {
    const index = currentAudioIndex > audioes.length - 1 ? 0 : currentAudioIndex
    audioes[index]?.play() 
  }
}

export const changeAudio = () => {
  currentAudioIndex++
  if (currentAudioIndex % (audioes.length) == 0) {
    currentAudioIndex--
    return false
  }
  currentAudioIndex = currentAudioIndex % (audioes.length)
  return true
}

export const addEndAudio = (audio: HTMLAudioElement) => {
  endAudioes.push(audio)
}

export const playEndAudio = (isPlay: boolean): void => {
  for (let audio of endAudioes) {
    audio.currentTime = 0 
    audio.pause()
  }
  if (isPlay) {
    const index = currentEndAudioIndex > endAudioes.length - 1 ? 0 : currentEndAudioIndex
    endAudioes[index]?.play()
  }
}

export const changeEndAudio = () => {
  currentEndAudioIndex++
  currentEndAudioIndex = currentEndAudioIndex % (endAudioes.length)
}