import { appWindow } from '@tauri-apps/api/window'
import { Status } from '../config'
import { Close } from '../icons/close'
import { Volume } from '../icons/volume'
import { VolumeMute } from '../icons/volume-mute'
import { changeAudio, isMute, playAudio } from '../utils'
import { memo, useCallback, useState } from 'react'
import { useStore } from '../store/store'

function AppBar() {
  const [status, today, total] = useStore((state) => [state.status, state.today, state.total])
  const [musicOff, setMusicOff] = useState(false)

  const onClick = useCallback(() => {
    if (status === Status.Tick) {
      changeAudio()
      setMusicOff(isMute())
      playAudio(!musicOff)
    }
  }, [status])

  return (
    <div className="flex flex-row justify-between space-x-1 pt-1 px-1">
      <button title="Change Audio or Mute" onClick={onClick}>
        {
          musicOff ? <VolumeMute width={16} height={16} /> : <Volume width={16} height={16} />
        }
      </button>
      <span className="text-xs" >{total}/{today}</span>
      <button title="Close Window" onClick={() => appWindow.close()}>
        <Close />
      </button>
    </div>
  )
}

export default memo(AppBar)
