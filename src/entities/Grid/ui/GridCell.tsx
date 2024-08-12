import React from 'react';
import { GridCellOccupation } from '../store';

interface GridCellProps {
    occupation: GridCellOccupation;
    onOccupationChange: (newOccupation: GridCellOccupation) => void;
}

const GridCell: React.FC<GridCellProps> = ({ occupation, onOccupationChange }) => {

    const handleClick = () => {
        const newOccupation = occupation === GridCellOccupation.EMPTY ? GridCellOccupation.PLAYER : GridCellOccupation.EMPTY;
        onOccupationChange(newOccupation);
    };

    return (
        <div onClick={handleClick}>
            <div className='flex'>
                <div className='border-b border-r h-4 w-4' />
                <div className='border-b h-4 w-4'/>
            </div>
            <div className='flex'>
                <div className='border-r h-4 w-4' />
                <div className='h-4 w-4'>{occupation === GridCellOccupation.PLAYER ? <div className='h-2 w-2 rounded-full bg-blue-800 relative -top-[4.5px] -left-[4.5px]' /> : null}</div>
            </div>
        </div>
    );
};

export default React.memo(GridCell, (prevProps, nextProps) => prevProps.occupation === nextProps.occupation);