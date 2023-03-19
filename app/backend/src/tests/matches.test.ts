import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
// import Example from '../database/models/ExampleModel';
import Matche from "../database/models/Matche";
import mockMatches from "./mocks/mocksMatches";

import { Response } from "superagent";
import MatchService from "../api/service/MatchService";
import ITeam from "../api/interfaces/ITeam";

chai.use(chaiHttp);

const { expect } = chai;

describe("Testa a service matche", () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Verifica se a service Matche.findAll() retorna os dados conforme esperado', async function () {
    // const mock: Team[] = mockTeams;

    sinon.stub(Matche, 'findAll').resolves(mockMatches as Matche[]);
    const service = new MatchService();
    const result = await service.readAll();

    expect(result).to.be.equal(mockMatches);
  });

  it('Verifica se a service Matche.byId() retorna os dados conforme esperado', async function () {
    // const mock: Team[] = mockTeams;

    sinon.stub(Matche, 'findAll').resolves(mockMatches as Matche[]);
    const service = new MatchService();
    const result = await service.readAll();

    expect(result[1]).to.be.equal(mockMatches[1]);
  });
});
