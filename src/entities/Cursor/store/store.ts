import { create } from 'zustand';
import { TeamColorEnum } from '../ui/Cursor';

interface Cursor {
  x: number;
  y: number;
  isSelf: boolean;
}

interface CursorState {
  cursors: { [key: string]: Cursor };
  addCursor: (id: string, isSelf: boolean, team: TeamColorEnum) => void;
  removeCursor: (id: string) => void;
  moveCursor: (id: string, x: number, y: number) => void;
}

const useCursorStore = create<CursorState>((set) => ({
  cursors: {},
  addCursor: (id, isSelf, team) => set((state) => ({
    cursors: {
      ...state.cursors,
      [id]: { x: -99, y: -99, isSelf, team}
    }
  })),
  removeCursor: (id) => set((state) => {
    const newCursors = { ...state.cursors };
    delete newCursors[id];
    return { cursors: newCursors };
  }),
  moveCursor: (id, x, y) => set((state) => ({
    cursors: {
      ...state.cursors,
      [id]: { x, y, isSelf: state.cursors[id]?.isSelf || false }
    }
  }))
}));

export default useCursorStore;