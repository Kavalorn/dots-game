import { useCallback, useEffect } from "react";
import { useGrid } from "~entities/Grid/hooks/useGrid";
import { GridCell } from "~entities/Grid/store";
import { usePeer } from "~entities/Peer"
import _ from 'lodash';
import useGameStore, { GameStatusEnum } from "../store";
import { useRTCGameStatus } from "./useRTCGameStatus";
import { useStatus } from "./useGameStatus";

export const useGame = () => {
    const {room} = usePeer();
    const {grid, setGrid} = useGrid({size: 20});
    const {addPlayer, removePlayer, players, setPlayerData} = useGameStore();
    const {gameStatus, setGameStatus} = useStatus();
    // grid state update
    const [sendGridUpdate, receiveGridUpdate] = room.makeAction<GridCell[][]>('gridUpdate');

    const handleGridUpdate = useCallback((newGrid: GridCell[][]) => {
        if (!_.isEqual(grid, newGrid)) {
            setGrid(newGrid);
        }
    }, [grid, setGrid]);

    // update->send grid
    useEffect(() => {
        sendGridUpdate(grid);
    }, [grid, sendGridUpdate]);

    useEffect(() => {
        receiveGridUpdate(handleGridUpdate);
    }, [receiveGridUpdate, handleGridUpdate]);

    // on join/leave add/remove player and set game status
    room.onPeerJoin((id) => {
        addPlayer(id);
    });
    room.onPeerLeave((id) => {
        if (players.length === 2 && players.find(player => player.id === id)) {
            setGameStatus(GameStatusEnum.DISCONNECTED);
            setTimeout(() => {
                setGameStatus(GameStatusEnum.WAITING_FOR_OPPONENT);
            }, 2000);
            removePlayer(id);
        }
    });

    useEffect(() => {
        if (players.length === 2 && gameStatus.status === GameStatusEnum.WAITING_FOR_OPPONENT) {
            setGameStatus(GameStatusEnum.SETUP_GAME);
        }
    }, [players]);

    return {players, gameStatus, setGameStatus, setPlayerData};
}