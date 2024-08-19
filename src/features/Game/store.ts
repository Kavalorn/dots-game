import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { TeamColorEnum } from '~shared/types';
import {devtools} from 'zustand/middleware';
import { selfId } from 'trystero/torrent';

export enum GameStatusEnum {
    WAITING_FOR_OPPONENT = 'wfo',
    SETUP_GAME = 'sg',
    PLAYING = 'p',
    GAMEOVER_WIN = 'gow',
    GAMEOVER_LOSE = 'gol',
    GAMEOVER_DRAW = 'gd',
    DISCONNECTED = 'd'
}

export type GamePlayer = {
    id: string;
    team: TeamColorEnum | null;
    points: number;
    name: string | null;
    isReady: boolean;
}

type UseGameStore = {
    players: GamePlayer[];
    addPlayer: (playerId: string) => void;
    removePlayer: (playerId: string) => void;
    setPlayerData: (playerId: string, data: Partial<GamePlayer>) => void;
}

const useGameStore = create<UseGameStore>()(devtools(immer((set) => {
    return {
    players: [{
        id: selfId,
        name: null,
        team: null,
        points: 0,
        isReady: false,
    }],
    addPlayer: (playerId: string) => set((state) => {
        if (state.players.length >= 2) return;
        state.players.push({
            id: playerId,
            team: null,
            name: null,
            points: 0,
            isReady: false,
        });
    }),
    removePlayer: (playerId: string) => set((state) => {
        state.players = state.players.filter((player) => player.id !== playerId);
    }),
    setPlayerData: (playerId: string, data: Partial<GamePlayer>) => set((state) => {
        const player = state.players.find((player) => player.id === playerId);
        if (!player) return;
        Object.assign(player, data);
    }),
}})));

export default useGameStore;