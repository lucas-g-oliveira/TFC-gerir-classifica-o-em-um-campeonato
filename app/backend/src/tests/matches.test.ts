import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import Matche from "../database/models/Matche";
import mockMatches from "./mocks/mocksMatches";
import MatchService from "../api/service/MatchService";
import TeamService from "../api/service/TeamService";

chai.use(chaiHttp);

const { expect } = chai;

describe("Testa a service matche", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Verifica se a service Matche.findAll() retorna os dados conforme esperado", async function () {
    sinon.stub(Matche, "findAll").resolves(mockMatches as Matche[]);
    const service = new MatchService();
    const result = await service.readAll();

    expect(result).to.be.equal(mockMatches);
  });

  it("Verifica se a service Matche.readByProgress retorna os dados conforme esperado", async function () {
    const mockMatchesInProgress = mockMatches.filter((e) => e.inProgress);
    const mockMatchesFinished = mockMatches.filter((e) => !e.inProgress);

    sinon.stub(Matche, "findAll").resolves(mockMatches as Matche[]);
    const service = new MatchService();
    const inProgress = await service.readByProgress(true);
    const finished = await service.readByProgress(false);

    expect(inProgress).to.be.equal(mockMatchesInProgress);
    expect(finished).to.be.equal(mockMatchesFinished);
  });

  it("Verifica se a service Matche.addMatch() retorna os dados conforme esperado", async function () {
    sinon.stub(Matche, "findAll").resolves(mockMatches as Matche[]);
    const serviceMatch = new MatchService();
    const serviceTeam = new TeamService()

    const addMatchOk = { homeTeamId: 1, awayTeamId: 2, homeTeamGoals: 2, awayTeamGoals: 1 };
    const addMatchBad = { homeTeamId: 1, awayTeamId: 1, homeTeamGoals: 2, awayTeamGoals: 1 }

    const sucessCase = await serviceMatch.addMatch(addMatchOk, serviceTeam);
    const failedCase = await serviceMatch.addMatch(addMatchBad, serviceTeam);

    expect(sucessCase.id).to.be.equal({...addMatchOk, id: 49});
    expect(failedCase).to.be.deep.equal({ code: 404, message: 'There is no team with such id!', error: true })
  });

  it("Verifica se a service Matche.finishMatch() retorna os dados conforme esperado", async function () {
    sinon.stub(Matche, "findAll").resolves(mockMatches as Matche[]);
    const service = new MatchService();
    const sucessCase = await service.finishMatch(2);
    expect(sucessCase).to.be.true;
  });

  it("Verifica se a service Matche.updateMatch() retorna os dados conforme esperado", async function () {
    sinon.stub(Matche, "findAll").resolves(mockMatches as Matche[]);
    const service = new MatchService();
    const sucessCase = await service.updateMatch(5, {homeTeamGoals: 4, awayTeamGoals: 5});
    expect(sucessCase).to.be.true;
  });
});
