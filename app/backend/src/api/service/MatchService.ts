import { ModelStatic } from 'sequelize';
import Matche from '../../database/models/Matche';
import IErrorService from '../interfaces/IErrorService';
import IServiceMatche from '../interfaces/IServiceMatche';

const ID_NOT_FOUND = 'ID não existe';

export default class MatchService implements IServiceMatche {
  protected model: ModelStatic<Matche> = Matche;

  async readAll(): Promise<Matche[]> {
    const data = await this.model.findAll();
    // implementar eager loading
    return data;
  }

  // implementar eager loading nos proximos matches
  async readById(id: number): Promise<Matche | IErrorService> {
    const data = await this.model.findOne({ where: { id } });
    if (!data) return { code: 404, message: ID_NOT_FOUND };
    return data;
  }
}
