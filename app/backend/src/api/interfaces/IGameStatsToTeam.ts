export default interface IGameStatsToTeam {
  id:number;
  teamName:string;
  score:number;
  homeTeam: boolean;
  matcheId: number;
  goalsFavor: number;
  goalsOwn: number;
  inProgress: boolean;
}
