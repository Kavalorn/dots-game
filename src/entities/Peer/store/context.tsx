import React, { createContext, useContext, ReactNode } from 'react';
import { PeerStore, usePeerStore } from './store';

const PeerContext = createContext<PeerStore | null>(null);

export const PeerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const peerStore = usePeerStore();
    return (
        <PeerContext.Provider value={peerStore}>
            {children}
        </PeerContext.Provider>
    );
};

export const usePeer = () => {
    const context = useContext(PeerContext);
    if (!context) {
        throw new Error('usePeer must be used within a PeerProvider');
    }
    return context;
};