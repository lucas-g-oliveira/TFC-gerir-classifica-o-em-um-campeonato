import Matche from '../../database/models/Matche';
import IErrorService from './IErrorService';
import IAddNewMatch from './IAddNewMatch';
import IServiceTeam from './IServiceTeam';
import ISetGoals from './ISetGoals';

export default interface IServiceMatche {
  readAll(): Promise<Matche[]>;
  readByProgress(inProgress: boolean): Promise<Matche[] | IErrorService>
  addMatch(dataMatch: IAddNewMatch, teamService:IServiceTeam): Promise<Matche | IErrorService>;
  finishMatch(id:number):Promise<boolean>;
  updateMatch(id:number, keysValues:ISetGoals):Promise<boolean>
}
