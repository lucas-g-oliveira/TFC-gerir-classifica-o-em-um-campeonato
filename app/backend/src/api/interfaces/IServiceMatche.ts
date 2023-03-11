import Matche from '../../database/models/Matche';
import IErrorService from './IErrorService';
import IAddNewMatch from './IAddNewMatch';
import IServiceTeam from './IServiceTeam';

export default interface IServiceMatche {
  readAll(): Promise<Matche[]>;
  readByProgress(inProgress: boolean): Promise<Matche[] | IErrorService>
  addMatch(dataMatch: IAddNewMatch, teamService:IServiceTeam): Promise<Matche | IErrorService>;
}
