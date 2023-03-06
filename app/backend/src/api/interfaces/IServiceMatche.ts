import Matche from '../../database/models/Matche';
import IErrorService from './IErrorService';
// import ITeam from "./ITeam";

export default interface IServiceMatche {
  readAll(): Promise<Matche[]>;
  readByProgress(inProgress: boolean): Promise<Matche[] | IErrorService>
}
