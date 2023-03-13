import ITeamStatus from './ITeamStatus';

export default interface ILeaderBoardService {
  getHomeTeams(): Promise<ITeamStatus[]>,
  getWaysTeams():Promise<ITeamStatus[]>,
  getHomeAndWayTeams():Promise<ITeamStatus[]>,
}
