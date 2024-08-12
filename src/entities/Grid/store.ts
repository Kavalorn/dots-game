import { useEffect } from "react";
import { create } from "zustand";
import {immer} from 'zustand/middleware/immer'

export enum GridCellOccupation {
    PLAYER,
    ENEMY,
    EMPTY
}

type GridCell = {
    occupiedBy: GridCellOccupation;
}

interface GridParameters {
    size: number;
}

type GridStore = {
    grid: GridCell[][];
    generateGrid: (params: GridParameters) => void;
    setCellOccupation: (x: number, y: number, newOccupation: GridCellOccupation) => void;
}

export const useGridStore = create<GridStore>()(immer((set) => ({
    grid: [],
    generateGrid: (params: GridParameters) => {
        set(state => {
            state.grid = Array.from({ length: params.size }, () => Array.from({ length: params.size }, () => ({ occupiedBy: GridCellOccupation.EMPTY })));
        });
    },
    setCellOccupation: (x: number, y: number, newOccupation: GridCellOccupation) => {
        set(state => {
            state.grid[x][y].occupiedBy = newOccupation;
        });
    }
})));

interface useGridParams {
    size: number;
}

export const useGrid = ({size}: useGridParams) => {
    const {grid, generateGrid, setCellOccupation} = useGridStore();

    useEffect(() => {
        generateGrid({size});
    }, [generateGrid, size]);

    return {grid, setCellOccupation}
}