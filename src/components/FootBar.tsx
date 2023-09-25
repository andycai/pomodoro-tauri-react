import { memo } from 'react';
import { Palette } from '../icons/palette';
import OperationButton from './OperationButton';
import RefreshButton from './RefreshButton';
import { useStore } from '../store/store';

function FootBar() {
  const changeTheme = useStore((state) => state.changeTheme)

  return (
    <div className="flex flex-row items-end mt-2 px-1">
      <button className="flex flex-row justify-start basis-1/4" title="Change Theme" onClick={changeTheme}>
        <Palette />
      </button>
      <OperationButton />
      <RefreshButton />
  </div>
  )
}

export default memo(FootBar)
