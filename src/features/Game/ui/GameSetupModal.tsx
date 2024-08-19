import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '~shared/components/ui/button'
import { DialogHeader, DialogFooter, Dialog, DialogContent, DialogTitle, DialogDescription } from '~shared/components/ui/dialog'
import { Input } from '~shared/components/ui/input'
import { Label } from '~shared/components/ui/label'
import Portal from '~shared/custom-components/Portal'
import { useGame } from '../hooks'
import { GamePlayer, GameStatusEnum } from '../store'
import { CustomCursorSelect } from '~shared/custom-components/Select'
import { usePeer } from '~entities/Peer'
import { Controller, useForm } from 'react-hook-form'
import { selfId } from 'trystero/torrent'
import { debounce } from 'lodash'
import { CursorImage } from '~features/Cursors'
import { TeamColorEnum } from '~shared/types'
import { CustomCheckbox } from '~shared/custom-components/Checkbox'
import { useRTCGameStatus } from '../hooks/useRTCGameStatus'
import { useStatus } from '../hooks/useGameStatus'

export enum WebRTCEventsEnum {
  SETUP_GAME = 'sgd',
  GAME_STATUS = 'gs',
}

type FormValues = {
  name: string;
  teamColor: string | undefined;
  isReady: boolean;
};

export const getSelftAsPlayer = (players: GamePlayer[]) => {
  const selfAsPlayer = players.find(player => player.id === selfId);
  if (!selfAsPlayer) throw new Error('self player not found');
  return players.find(player => player.id === selfId);
}

export const GameSetupModal = () => {
    const { players, setPlayerData } = useGame()
    const {gameStatus, setGameStatus} = useStatus()
    const { room } = usePeer()
    const {register, watch, formState, control} = useForm<FormValues>({
      defaultValues: {
        name: selfId,
        teamColor: undefined,
        isReady: false
      }
    })

    const { setRTCGameStatus } = useRTCGameStatus();

    const [sendGameSetupData, receiveGameSetupData] = room.makeAction<GamePlayer>(WebRTCEventsEnum.SETUP_GAME);

    const isOpen = gameStatus.status === GameStatusEnum.SETUP_GAME;

    const self = getSelftAsPlayer(players);

    const watchedValues = watch();

    useEffect(() => {
      setPlayerData(selfId, {
        name: watchedValues.name,
        team: watchedValues.teamColor as TeamColorEnum,
        isReady: watchedValues.isReady
      })
    }, [watchedValues]);

    const debouncedSendGameSetupData = useCallback(
      debounce((data) => {
          sendGameSetupData(data);
      }, 300),
      []
  );

  useEffect(() => {
    receiveGameSetupData((data) => {
      setPlayerData(data.id, {
        name: data.name,
        team: data.team as TeamColorEnum,
        isReady: data.isReady
      })
    });
  }, [receiveGameSetupData]);

  useEffect(() => {
    if (watchedValues) {
        debouncedSendGameSetupData({
            id: selfId,
            name: watchedValues.name,
            team: watchedValues.teamColor,
            isReady: watchedValues.isReady
        });
    }
}, [watchedValues, debouncedSendGameSetupData]);

useEffect(() => {
  console.log('players', players);
  if (players.some(player => !player.isReady)) return;
  if (gameStatus.status === GameStatusEnum.SETUP_GAME) {
    setRTCGameStatus(GameStatusEnum.PLAYING);
  }
}, [players]);

    return !isOpen ? null : (
      <>
        <Portal>
          <Dialog open={isOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Get ready for the game</DialogTitle>
                <DialogDescription>
                  select team color and name
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    {...register('name')}
                    defaultValue={getSelftAsPlayer(players)?.id}
                    className="col-span-3"
                    disabled={watchedValues.isReady}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Team color
                  </Label>
                  <Controller 
                    control={control}
                    name="teamColor"
                    render={({field: {onChange, value, name}, formState}) => (
                      <CustomCursorSelect
                        name={name}
                        onValueChange={onChange}
                        defaultValue={value}
                        classNames='col-span-3'
                        disabled={watchedValues.isReady}
                      />
                    )}
                  />
                </div>
              </div>
              <pre>
                {JSON.stringify(watchedValues, null, 2)}
              </pre>
              <DialogFooter>
                <Controller
                  control={control}
                  name="isReady"
                  render={({field: {onChange, value, name}}) => (
                    <CustomCheckbox
                      value={value}
                      onChange={onChange}
                      name={name}
                      disabled={!self?.name || !self.team}
                    />
                  )}
                />
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Portal>
      </>
    )
  }