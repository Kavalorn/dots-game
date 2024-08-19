import { useEffect, useState } from 'react';
import { usePeer } from '~entities/Peer';
import useCursorStore from '../store/store';

const useCursor = () => {
  const { room, selfId } = usePeer();
  const { cursors, addCursor, removeCursor, moveCursor } = useCursorStore();
  const [sendMove, setSendMove] = useState<((payload: [number, number]) => void) | null>(null);

  useEffect(() => {
    const init = async () => {
      const [sendMove, getMove] = room.makeAction<[number, number]>('mouseMove');
      setSendMove(() => sendMove);

      room.onPeerJoin(id => {
        if (selfId === id) return;
        addCursor(id);
      });
      room.onPeerLeave(removeCursor);
      getMove(([x, y], id) => moveCursor(id, x * window.innerWidth, y * window.innerHeight));
    };

    init();

    const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
      const mouseX = clientX / window.innerWidth;
      const mouseY = clientY / window.innerHeight;
      if (room && sendMove) {
        sendMove([mouseX, mouseY]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [room, selfId, sendMove, addCursor, moveCursor, removeCursor]);

  return { cursors };
};

export default useCursor;