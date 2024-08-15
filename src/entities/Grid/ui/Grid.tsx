import React from 'react';
import GridCell from './GridCell';
import { GridCellOccupation } from '../store';
import { useGrid } from '../hooks/useGrid';


interface GridProps {
    size: number;
}

const Grid: React.FC<GridProps> = ({ size }) => {
    const {grid, setCellOccupation} = useGrid({size: 20});

    const handleOccupationChange = (x: number, y: number, newOccupation: GridCellOccupation) => {
        setCellOccupation(x, y, newOccupation);
    };

    return (
        <div className='border'>
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex' }}>
                    {row.map((cell, colIndex) => (
                        <GridCell
                            key={colIndex}
                            occupation={cell.occupiedBy}
                            onOccupationChange={(newOccupation) => handleOccupationChange(rowIndex, colIndex, newOccupation)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Grid;