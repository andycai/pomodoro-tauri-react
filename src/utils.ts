import { ONE_MINUTE, diAudioPaths, endAudioPaths } from "./config";

export const convertMinuteString = (count: number) : string => {
  return (`${Math.floor(count / ONE_MINUTE) < 10 ? "0" : ""}${Math.floor(count / ONE_MINUTE)}`)
}

export const convertSecondString = (count: number) : string => {
  return (`${Math.floor(count % ONE_MINUTE) < 10 ? "0" : ""}${count % ONE_MINUTE}`)
}

export const convertTimeString = (count: number) : string => {
  return (`${Math.floor(count / ONE_MINUTE)}:${Math.floor(count % ONE_MINUTE) < 10 ? "0" : ""}${count % ONE_MINUTE}`)
}

let audioObjs = new Map();
let endAudioObjs = new Map();

let currentAudioIndex = 0
let currentEndAudioIndex = 0
let needMute = true

export const addAudio = (path: string, audio: HTMLAudioElement) => {
  audioObjs.set(path, audio)
}

export const playAudio = (isPlay: boolean): void => {
  for (let audio of audioObjs.values()) {
    audio.currentTime = 0 
    audio.pause()
  }
  if (isPlay) {
    const index = currentAudioIndex > diAudioPaths.length - 1 ? 0 : currentAudioIndex
    audioObjs.get(diAudioPaths[index])?.play() 
  }
}

export const changeAudio = () => {
  currentAudioIndex++
  if (needMute == true && (currentAudioIndex % diAudioPaths.length) == 0) {
    needMute = false
    currentAudioIndex--
    // console.log("index1:", currentAudioIndex)
    return false
  }
  needMute = true
  // console.log("", currentAudioIndex, diAudioPaths.length, currentAudioIndex % (diAudioPaths.length))
  currentAudioIndex = currentAudioIndex % (diAudioPaths.length)
  // console.log("index2:", currentAudioIndex)
  return true
}

export const addEndAudio = (path: string, audio: HTMLAudioElement) => {
  endAudioObjs.set(path, audio)
}

export const playEndAudio = (isPlay: boolean): void => {
  for (let audio of endAudioObjs.values()) {
    audio.currentTime = 0 
    audio.pause()
  }
  if (isPlay) {
    const index = currentEndAudioIndex > endAudioPaths.length - 1 ? 0 : currentEndAudioIndex
    endAudioObjs.get(endAudioPaths[index])?.play() 
  }
}