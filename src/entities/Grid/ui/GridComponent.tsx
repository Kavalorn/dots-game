import React from 'react';
import GridCell from './GridCell';
import { GridCellOccupation } from '../models/Grid';

interface GridProps {
    size: number;
}

const GridComponent: React.FC<GridProps> = ({ size }) => {
    const initialGrid = Array.from({ length: size }, () =>
        Array.from({ length: size }, () => GridCellOccupation.EMPTY)
    );

    const [grid, setGrid] = React.useState(initialGrid);

    const handleOccupationChange = (x: number, y: number, newOccupation: GridCellOccupation) => {
        const newGrid = grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (rowIndex === x && colIndex === y ? newOccupation : cell))
        );
        setGrid(newGrid);
    };

    return (
        <div className='border'>
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex' }}>
                    {row.map((cell, colIndex) => (
                        <GridCell
                            key={colIndex}
                            initialOccupation={cell}
                            onOccupationChange={(newOccupation) => handleOccupationChange(rowIndex, colIndex, newOccupation)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GridComponent;