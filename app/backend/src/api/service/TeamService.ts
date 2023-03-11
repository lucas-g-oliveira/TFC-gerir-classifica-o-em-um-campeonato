import { ModelStatic } from 'sequelize';
import Team from '../../database/models/Team';
import IErrorService from '../interfaces/IErrorService';
import IServiceTeam from '../interfaces/IServiceTeam';

const ID_NOT_FOUND = 'ID não existe';

export default class TeamService implements IServiceTeam {
  protected model: ModelStatic<Team> = Team;

  async readAll(): Promise<Team[]> {
    const data = await this.model.findAll();
    return data as Team[];
  }

  async readById(id: number): Promise<Team | IErrorService> {
    const data = await this.model.findOne({ where: { id } });
    if (!data) return { code: 404, message: ID_NOT_FOUND, error: true } as IErrorService;
    return data as Team;
  }

  async readListIds(ids:Array<number>): Promise<Team[]> {
    const data = await this.model.findAll({ where: { id: [...ids] } });
    return data as Team[];
  }
}
