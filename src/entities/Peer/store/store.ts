import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {joinRoom, Room, selfId} from 'trystero/torrent';

const config = {appId: 'tadaa'}

export interface PeerStore {
    room: Room;
    selfId: string;
}

export const usePeerStore = create<PeerStore>()(immer((set) => {
        const room = joinRoom(config, 'room1')

        room.onPeerJoin(peerId => {
            console.log(`${peerId} joined`);
            // Assuming trystero provides a way to access the peer connection
            const peerConnection = room.getPeers()[peerId];
            console.log('tada: ', peerConnection);
            if (peerConnection) {
                peerConnection.onconnectionstatechange = (event) => {
                    try {
                        const pc = event.target as RTCPeerConnection;
                        if (pc.connectionState === 'failed') {
                            console.error('Connection failed.');
                        }
                    } catch (error) {
                        console.error('Connection state change error:', error);
                    }
                };
            }
        });
    
        room.onPeerLeave(peerId => console.log(`${peerId} left`));
    return ({
        room: room,
        selfId: selfId
    })
}));