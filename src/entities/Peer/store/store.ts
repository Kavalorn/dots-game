import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {joinRoom, Room, selfId} from 'trystero';

const config = {appId: 'tadaa'}

export interface PeerStore {
    room: Room;
    selfId: string;
}

export const usePeerStore = create<PeerStore>()(immer((set) => {
    const room = joinRoom(config, 'room1')
    room.onPeerJoin(peerId => console.log(`${peerId} joined`))
    room.onPeerLeave(peerId => console.log(`${peerId} left`))

    return ({
        room: room,
        selfId: selfId
    })
}));