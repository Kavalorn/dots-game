import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { joinRoom, Room, selfId } from 'trystero/torrent';
import { config } from '~app/config';
import { TeamColorEnum } from '~entities/Cursor/ui/Cursor';

export interface Cursor {
  x: number;
  y: number;
  team: string;
}

export interface PeerStore {
  room: Room;
  team: TeamColorEnum;
  selfId: string;
  cursors: Record<string, Cursor>;
  addCursor: (id: string, cursor: Cursor) => void;
  moveCursor: (id: string, x: number, y: number) => void;
  removeCursor: (id: string) => void;
}

export const usePeerStore = create<PeerStore>()(immer((set) => {
  const room = joinRoom({
    appId: config.appId
  }, 'room1');

  return {
    room: room,
    selfId: selfId,
    cursors: {},
    team: TeamColorEnum.BLUE,
    addCursor: (id: string, cursor: Cursor) => set(state => {
      state.cursors[id] = cursor;
    }),
    moveCursor: (id: string, x: number, y: number) => set(state => {
      if (state.cursors[id]) {
        state.cursors[id].x = x;
        state.cursors[id].y = y;
      }
    }),
    removeCursor: (id: string) => set(state => {
      delete state.cursors[id];
    })
  };
}));