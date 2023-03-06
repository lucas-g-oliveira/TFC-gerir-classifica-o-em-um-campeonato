import Matche from '../../database/models/Matche';
import IErrorService from './IErrorService';
// import ITeam from "./ITeam";

export default interface IServiceMatche {
  readAll(): Promise<Matche[]>;
  readById(id:number): Promise<Matche | IErrorService>
}
