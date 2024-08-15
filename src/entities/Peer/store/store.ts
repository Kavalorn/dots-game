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
  setTeam: (team: TeamColorEnum) => void;
}

export const usePeerStore = create<PeerStore>()(immer((set) => {
  const room = joinRoom({
    appId: config.appId
  }, 'room1');

  return {
    room: room,
    selfId: selfId,
    team: TeamColorEnum.BLUE,
    setTeam: (team: TeamColorEnum) => {
      set(state => {
        state.team = team;
      });
    }
  };
}));