import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
// import Example from '../database/models/ExampleModel';
import Team from "../database/models/Team";
import mockTeams from "./mocks/mocksTeams";

import { Response } from "superagent";
import TeamService from "../api/service/TeamService";
import ITeam from "../api/interfaces/ITeam";

chai.use(chaiHttp);

const { expect } = chai;

describe("Testa a service teams", () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Verifica se a service Team.findAll() retorna os dados conforme esperado', async function () {
    // const mock: Team[] = mockTeams;

    sinon.stub(Team, 'findAll').resolves(mockTeams as Team[]);
    const service = new TeamService();
    const result = await service.readAll();

    expect(result).to.be.equal(mockTeams);
  });

  it('Verifica se a service Team.getOne() retorna os dados conforme esperado', async function () {
    const team = {"id": 3,"teamName": "Botafogo"};

    sinon.stub(Team, 'findOne').resolves(team as Team);
    const service = new TeamService();
    const result = await service.readById(3);

    expect(result.id).to.be.equal(mockTeams[2].id);
  });
});
