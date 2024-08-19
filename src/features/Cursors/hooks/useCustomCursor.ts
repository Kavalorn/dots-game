import { useEffect, useState } from 'react';
import { getCursorUrl, getTeamColorById } from '../ui';
import { useGame } from '~features/Game';
import { selfId } from 'trystero/torrent';

const useCustomCursor = () => {
  const {players} = useGame();
  const [cursorUrl, setCursorUrl] = useState<string>('');

  useEffect(() => {
    setCursorUrl(getCursorUrl(getTeamColorById(selfId, players)));
  }, [players])

  useEffect(() => {
    const originalCursor = document.body.style.cursor;
    document.body.style.cursor = `url(${cursorUrl}) 0 44, auto`;

    return () => {
      document.body.style.cursor = originalCursor;
    };
  }, [cursorUrl]);
};

export default useCustomCursor;