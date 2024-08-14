import React, { useEffect } from 'react';

export enum TeamColorEnum {
  BLUE = 'blue',
  RED = 'red',
}

interface CursorProps {
  id: string;
  x: number;
  y: number;
  isSelf: boolean;
  team: TeamColorEnum;
}

const Cursor: React.FC<CursorProps> = ({ id, x, y, isSelf, team }) => {

  useEffect(() => {
    const cursorClass = team === TeamColorEnum.BLUE ? 'cursor-blue' : 'cursor-red';
    document.body.classList.add(cursorClass);

    return () => {
      document.body.classList.remove(cursorClass);
    };
  }, [team]);

  return (
    <div
      className={`cursor${isSelf ? ' ' : ''} h-6 w-6`}
      style={{ left: x, top: y, position: 'absolute' }}
    >
      <img src={`images/cursor-${team}.svg`} alt="cursor" />
      <p>{isSelf ? 'you' : id.slice(0, 4)}</p>
    </div>
  );
};

export default Cursor;