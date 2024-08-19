import { TeamColorEnum } from "~shared/types";

export const getTeamColor = (team: TeamColorEnum | null = null) => team || 'black';