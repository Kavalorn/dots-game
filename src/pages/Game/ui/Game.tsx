import useCursor from "~entities/Cursor/hooks/useCursor";
import Cursor, { TeamColorEnum } from "~entities/Cursor/ui/Cursor";
import Grid from "~entities/Grid/ui/Grid";
import { PeerDebug } from "~entities/Peer/ui/PeerDebug";

export function Game() {
    const { cursors } = useCursor();
    
    return (
        <div className="grid min-h-screen w-full">
            {Object.entries(cursors).map(([id, { x, y, isSelf }]) => (
                <Cursor key={id} id={id} x={x} y={y} isSelf={isSelf} team={TeamColorEnum.BLUE} />
            ))}
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
