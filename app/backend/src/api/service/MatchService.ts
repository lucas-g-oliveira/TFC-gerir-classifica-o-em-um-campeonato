import { ModelStatic } from 'sequelize';
import Team from '../../database/models/Team';
import Matche from '../../database/models/Matche';
import IErrorService from '../interfaces/IErrorService';
import IServiceMatche from '../interfaces/IServiceMatche';
import IAddNewMatch from '../interfaces/IAddNewMatch';
import IServiceTeam from '../interfaces/IServiceTeam';

const ID_NOT_FOUND = 'ID não existe';

export default class MatchService implements IServiceMatche {
  protected model: ModelStatic<Matche> = Matche;
  protected modelMatch: ModelStatic<Matche> = Matche;

  async readAll(): Promise<Matche[]> {
    const data = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam' },
        { model: Team, as: 'awayTeam' },
      ],
    });
    return data;
  }

  async readByProgress(inProgress: boolean): Promise<Matche[] | IErrorService> {
    const data = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'homeTeam' },
        { model: Team, as: 'awayTeam' },
      ],
    });

    if (!data) return { code: 404, message: ID_NOT_FOUND, error: true } as IErrorService;
    return data as Matche[];
  }

  async addMatch(dataMatch: IAddNewMatch, _teamService: IServiceTeam)
    : Promise<Matche | IErrorService > {
    // const data = await teamService.readListIds([dataMatch.homeTeamId, dataMatch.awayTeamId]);
    const data = await this.modelMatch
      .findAll({ where: { id: [dataMatch.homeTeamId, dataMatch.awayTeamId] } });

    if (data.length === 2) {
      const newMatche = await this.model.create({ ...dataMatch, inProgress: true });
      const { id } = newMatche.dataValues;
      const result = { id, ...dataMatch, inProgress: true };
      return result as Matche;
    }
    return { code: 404, message: 'There is no team with such id!', error: true } as IErrorService;
  }
}
