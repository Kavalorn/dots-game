import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { TeamColorEnum } from '~shared/types';
import {devtools} from 'zustand/middleware';
import { selfId } from 'trystero/torrent';
import { GameStatusEnum } from '../store';

type GameStatus = {
    status: GameStatusEnum;
}

type UseGameStatusStore = {
    gameStatus: GameStatus;
    setGameStatus: (status: GameStatusEnum) => void;
}

const useGameStatusStore = create<UseGameStatusStore>()(devtools(immer((set) => {
    return {
    gameStatus: {
        status: GameStatusEnum.WAITING_FOR_OPPONENT,
    },
    setGameStatus: (status: GameStatusEnum) => set((state) => {
        state.gameStatus.status = status;
    })
}})));

const useStatus = () => {
    const {gameStatus, setGameStatus} = useGameStatusStore();

    return {gameStatus, setGameStatus};
}

export {
    useGameStatusStore,
    useStatus
}