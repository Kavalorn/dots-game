import React from 'react';
import { useGame } from '~features/Game';
import { getTeamColor } from '~shared/functions';
import { TeamColorEnum } from '~shared/types';

interface CursorProps {
  id: string;
  x: number;
  y: number;
  team: TeamColorEnum | null;
  name: string;
  getCursorUrl: (team: TeamColorEnum | null) => string;
}

const Cursor: React.FC<CursorProps> = ({ id, x, y, team, name, getCursorUrl }) => {

  return (
    <div
      className={`cursor h-6 w-6`}
      style={{ left: x, top: y - 23, position: 'absolute' }}
    >
      <img src={getCursorUrl(team)} alt="cursor" />
      <p>{name}</p>
    </div>
  );
};

export default Cursor;