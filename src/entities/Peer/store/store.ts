import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { joinRoom, Room, selfId } from 'trystero/torrent';
import { config } from '~app/config';

export interface Cursor {
  x: number;
  y: number;
  team: string;
}

export interface PeerStore {
  room: Room;
  selfId: string;
}

export const usePeerStore = create<PeerStore>()(immer((set) => {
  const room = joinRoom({
    appId: config.appId
  }, 'room1');

  return {
    room: room,
    selfId: selfId
  };
}));