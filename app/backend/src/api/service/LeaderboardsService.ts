import { ModelStatic } from 'sequelize';
import Team from '../../database/models/Team';
import IGameStatsToTeam from '../interfaces/IGameStatsToTeam';
import Matche from '../../database/models/Matche';
import ITeamStatus from '../interfaces/ITeamStatus';
import ITeam from '../interfaces/ITeam';
import ILeaderBoardService from '../interfaces/ILeaderBoardService';

export default class LeaderboardsService implements ILeaderBoardService {
  protected modelMatch: ModelStatic<Matche> = Matche;
  protected modelTeam: ModelStatic<Team> = Team;

  private static point(h:number, w:number) {
    if (h > w) return 3;
    if (h < w) return 0;
    return 1;
  }

  private static sortMult(arr:Array<ITeamStatus>): Array<ITeamStatus> {
    arr.sort((a, b) => b.goalsOwn - a.goalsOwn)
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);
    return arr;
  }

  private static dataWorkHome(arr:Array<Matche>, teamsData:Array<ITeam>) {
    const teams:Array<IGameStatsToTeam> = arr.map((e) => ({
      id: e.homeTeamId,
      teamName: teamsData.filter((j) => j.id === e.homeTeamId)[0].teamName,
      score: LeaderboardsService.point(e.homeTeamGoals, e.awayTeamGoals),
      homeTeam: true,
      matcheId: e.id,
      goalsFavor: e.homeTeamGoals,
      goalsOwn: e.awayTeamGoals,
      inProgress: e.inProgress,
    }));
    return teams;
  }

  private static dataWorkAway(arr:Array<Matche>, teamsData:Array<ITeam>) {
    const teams: Array<IGameStatsToTeam> = arr.map((e) => ({
      id: e.awayTeamId,
      teamName: teamsData.filter((j) => j.id === e.awayTeamId)[0].teamName,
      score: LeaderboardsService.point(e.awayTeamGoals, e.homeTeamGoals),
      homeTeam: false,
      matcheId: e.id,
      goalsFavor: e.awayTeamGoals,
      goalsOwn: e.homeTeamGoals,
      inProgress: e.inProgress,
    }));
    return teams;
  }

  private static dataTable(arr:IGameStatsToTeam[]) {
    const teamsIds = [...new Set(arr.map((e):number => e.id))]; //
    const currTeam = (t:number) => arr.filter((j) => j.id === t);
    const effici = (t:number) => (
      (currTeam(t).reduce((a, c) => a + c.score, 0) / (currTeam(t).length * 3)) * 100).toFixed(2);

    const data = teamsIds.map((t) => ({
      name: currTeam(t)[0].teamName,
      totalPoints: currTeam(t).reduce((acc, curr) => acc + curr.score, 0),
      totalGames: currTeam(t).length,
      totalVictories: currTeam(t).filter((j) => j.score === 3).length,
      totalDraws: currTeam(t).filter((j) => j.score === 0).length,
      totalLosses: currTeam(t).filter((j) => j.score === 3).length,
      goalsFavor: currTeam(t).reduce((acc, curr) => acc + curr.goalsFavor, 0),
      goalsOwn: currTeam(t).reduce((acc, curr) => acc + curr.goalsOwn, 0),
      goalsBalance: currTeam(t).reduce((acc, curr) => acc + (curr.goalsFavor - curr.goalsOwn), 0),
      efficiency: parseFloat(effici(t)),
    }));
    return data as Array<ITeamStatus>;
  }

  private async getAllTeamsStatus():Promise<IGameStatsToTeam[]> {
    const teams = await this.modelTeam.findAll();
    const matches = await this.modelMatch.findAll();
    const finished = matches.filter((e) => !e.inProgress);
    const awayTeams = LeaderboardsService.dataWorkAway(finished, teams);
    const homeTeams = LeaderboardsService.dataWorkHome(finished, teams);
    return [...awayTeams, ...homeTeams];
  }

  async getHomeTeams() {
    const table = await this.getAllTeamsStatus();
    const filtered = table.filter((e) => e.homeTeam);
    const data = LeaderboardsService.dataTable(filtered);
    return LeaderboardsService.sortMult(data);
  }

  async getWaysTeams() {
    const table = await this.getAllTeamsStatus();
    const filtered = table.filter((e) => !e.homeTeam);
    const data = LeaderboardsService.dataTable(filtered);
    return LeaderboardsService.sortMult(data);
  }

  async getHomeAndWayTeams() {
    const table = await this.getAllTeamsStatus();
    const data = LeaderboardsService.dataTable(table);
    return LeaderboardsService.sortMult(data);
  }
}
