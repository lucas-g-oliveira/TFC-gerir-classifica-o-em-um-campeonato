import Team from '../../database/models/Team';
import IErrorService from './IErrorService';
// import ITeam from "./ITeam";

export default interface IServiceTeam {
  readAll(): Promise<Team[]>;
  readById(id:number): Promise<Team | IErrorService>
  readListIds(ids:Array<number>): Promise<Team[]>
}
