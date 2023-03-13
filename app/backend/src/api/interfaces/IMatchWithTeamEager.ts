import ITeam from './ITeam';

export default interface IMatchWithTeamEager {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: ITeam,
  awayTeam:ITeam,
}
