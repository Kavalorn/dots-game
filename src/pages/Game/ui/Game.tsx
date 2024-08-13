import Grid from "~entities/Grid/ui/Grid";
import { PeerDebug } from "~entities/Peer/ui/PeerDebug";

export function Game() {
    
    return (
        <div className="grid min-h-screen w-full">
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
