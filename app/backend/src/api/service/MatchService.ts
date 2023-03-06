import { ModelStatic } from 'sequelize';
import Team from '../../database/models/Team';
import Matche from '../../database/models/Matche';
import IErrorService from '../interfaces/IErrorService';
import IServiceMatche from '../interfaces/IServiceMatche';

const ID_NOT_FOUND = 'ID não existe';

export default class MatchService implements IServiceMatche {
  protected model: ModelStatic<Matche> = Matche;

  async readAll(): Promise<Matche[]> {
    const data = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam' },
        { model: Team, as: 'awayTeam' },
      ],
    });
    return data;
  }

  async readById(id: number): Promise<Matche | IErrorService> {
    const data = await this.model.findOne({
      where: { id },
      include: [
        { model: Team, as: 'homeTeam' },
      ],
    });

    if (!data) return { code: 404, message: ID_NOT_FOUND };
    return data;
  }
}
