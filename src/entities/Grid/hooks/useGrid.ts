import { useEffect } from "react";
import { useGridStore } from "../store";

interface useGridParams {
    size: number;
}

export const useGrid = ({size}: useGridParams) => {
    const gridStore = useGridStore();
    const {generateGrid} = gridStore;

    useEffect(() => {
        generateGrid({size});
    }, [generateGrid, size]);

    return gridStore;
}