import React from 'react'
import { usePeer } from '../store/context'
import { Alert, AlertTitle, AlertDescription } from '~shared/components/ui/alert';
import { Input } from '~shared/components/ui/input';
import { Button } from '~shared/components/ui/button';
import { DataPayload } from 'trystero';

export const PeerDebug = () => {
    const { room, selfId } = usePeer();
    const [lastReceivedMessage, setLastReceivedMessage] = React.useState<string>('no messages yet');
    const [postMessageText, setPostMessageText] = React.useState('');
    const [postMessage, getMessage] = room.makeAction('debug');
    getMessage((message: DataPayload) => {
        setLastReceivedMessage(message?.toString() || 'wrong message type')
    })
    return (
        <Alert className='absolute top-2 left-2 w-auto'>
            <AlertTitle>Peer debug</AlertTitle>
            <AlertDescription>
                <div>peerId: {selfId}</div>
                <div>last msg: {lastReceivedMessage}</div>
                <div className='flex gap-2'>
                    <Input placeholder='message to send...' value={postMessageText} onChange={(e) => setPostMessageText(e.target.value)} />
                    <Button onClick={() => postMessage(postMessageText)}>Send</Button>
                </div>
            </AlertDescription>
        </Alert>
    )
}
