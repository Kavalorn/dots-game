import { useEffect } from "react";
import { useGridStore } from "../store";

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