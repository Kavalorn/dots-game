export enum GridCellOccupation {
    PLAYER,
    ENEMY,
    EMPTY
}

type GridCellData = {
    occupiedBy: GridCellOccupation;
}

interface GridParameters {
    size: number;
}

export class Grid {
    private readonly grid: GridCellData[][] = [];

    constructor(parameters: GridParameters) {
        this.generateGrid(parameters);
    }

    private generateGrid(parameters: GridParameters) {
        for (let i = 0; i < parameters.size; i++) {
            this.grid[i] = [];
            for (let j = 0; j < parameters.size; j++) {
                this.grid[i][j] = {
                    occupiedBy: GridCellOccupation.EMPTY
                };
            }
        }
    }

    public updateCell(x: number, y: number, occupation: GridCellOccupation) {
        if (this.grid[x] && this.grid[x][y]) {
            this.grid[x][y].occupiedBy = occupation;
        }
    }
}