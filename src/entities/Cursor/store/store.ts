import { create } from 'zustand';
import { TeamColorEnum } from '../ui/Cursor';

interface Cursor {
  x: number;
  y: number;
}

interface CursorState {
  cursors: { [key: string]: Cursor };
  addCursor: (id: string, team: TeamColorEnum) => void;
  removeCursor: (id: string) => void;
  moveCursor: (id: string, x: number, y: number) => void;
}

const useCursorStore = create<CursorState>((set) => ({
  cursors: {},
  addCursor: (id, team) => set((state) => ({
    cursors: {
      ...state.cursors,
      [id]: { x: -99, y: -99, team}
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
      [id]: { x, y }
    }
  }))
}));

export default useCursorStore;