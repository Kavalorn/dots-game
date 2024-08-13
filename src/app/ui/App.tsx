
import { PeerProvider } from '~entities/Peer';
import './styles.global.css';
import { Game } from '~pages/Game/ui';

export function App() {
  return (
    <div test-id="test-root">
      <PeerProvider>
        <Game />
      </PeerProvider>
    </div>
  );
}
