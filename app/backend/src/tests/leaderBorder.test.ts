import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
// import Example from '../database/models/ExampleModel';
import Team from "../database/models/Team";
import Matche from "../database/models/Matche";
import mockTeams from "./mocks/mocksTeams";
import mockMatches from "./mocks/mocksMatches";
import mockTeamsStatus from "./mocks/mockLeaderboard";
import mockWayTeamStatus from "./mocks/mockleaderboardAway";
import mockHomeTeamStatus from "./mocks/mockleaderboardHome";

import LeaderBorderService from "../api/service/LeaderboardsService";
import IMatchWithTeamEager from "../api/interfaces/IMatchWithTeamEager";

const { expect } = chai;

describe("Testa a service leaderboard", () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Verifica se as funçoes da service leadeboard retorna os resultados conforme esperado', async function () {
    // const mock: Team[] = mockTeams;

    sinon.stub(Team, 'findAll').resolves(mockTeams as Team[]);
    sinon.stub(Matche, 'findAll').resolves(mockMatches as Matche[]);

    const service = new LeaderBorderService();
    const result = await service.getHomeAndWayTeams();
    const home = await service.getWaysTeams();
    const way = await service.getHomeTeams();

    expect(result).to.be.equal(mockTeamsStatus);
    expect(home).to.be.equal(mockHomeTeamStatus);
    expect(way).to.be.equal(mockWayTeamStatus);
  });
});
