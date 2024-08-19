import React, { useEffect } from 'react'
import { usePeer } from '~entities/Peer';
import { WebRTCEventsEnum } from '../ui/GameSetupModal';
import { useGame } from './useGame';
import { GameStatusEnum } from '../store';
import { useStatus } from './useGameStatus';

export const useRTCGameStatus = () => {
    const {room} = usePeer();
    const {gameStatus, setGameStatus} = useStatus();

    const [sendGameStatus, receiveGameStatus] = room.makeAction<GameStatusEnum>(WebRTCEventsEnum.GAME_STATUS);

    receiveGameStatus((status) => {
        if (gameStatus.status !== status) {
            setGameStatus(status);
        }
    });

    const setRTCGameStatus = (status: GameStatusEnum) => {
        setGameStatus(status);
        sendGameStatus(gameStatus.status);
    }

  return {setRTCGameStatus}
}
