import useCursor from "~entities/Cursor/hooks/useCursor";
import Cursor from "~entities/Cursor/ui/Cursor";
import Grid from "~entities/Grid/ui/Grid";
import { useGame } from "../hooks";
import { PeerDebug } from "~widgets/PeerDebug";
import { GameSetupModal } from "./GameSetupModal";
import { GameStatusEnum } from "../store";
import { Cursors } from "~features/Cursors";
import { useEffect } from "react";
import { useStatus } from "../hooks/useGameStatus";

function GameFeat() {
    const {gameStatus} = useStatus();

    const renderModal = () => {
        switch (gameStatus.status) {
            case GameStatusEnum.WAITING_FOR_OPPONENT: {
                return null;
            }
            case GameStatusEnum.SETUP_GAME: {
                return <GameSetupModal />;
            }
            case GameStatusEnum.PLAYING: {
                return null;
            }
            case GameStatusEnum.GAMEOVER_WIN: {
                return 'you win!';
            }
            case GameStatusEnum.GAMEOVER_LOSE: {
                return 'you lose!';
            }
            case GameStatusEnum.GAMEOVER_DRAW: {
                return 'draw!';
            }
            case GameStatusEnum.DISCONNECTED: {
                return 'disconnected';
            }
            default:
                return null;
        }
    }
    
    return (
        <div className="grid min-h-screen w-full">
            {renderModal()}
            <Cursors />
            <PeerDebug />
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <div
                        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
                    >
                        <Grid size={20} />
                    </div>
                </main>
            </div>
        </div>
    )
}

export {
    GameFeat
}