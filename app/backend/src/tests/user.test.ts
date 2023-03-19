import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import User from "../database/models/Users";

import Userservice from "../api/service/UserService";
import IUserLogin from "../api/interfaces/IUserLogin";
import IErrorService from "../api/interfaces/IErrorService";
import IUserCrededential from "../api/interfaces/IUserCredential";

chai.use(chaiHttp);

const { expect } = chai;

describe("Testa a service user", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Verifica se a service user.login() retorna os dados conforme esperado", async function () {
    const data = {
      email: "admin@admin.com",
      password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
      role: "admin",
      username: "Admin",
    };
    const passwordValid = "secret_admin";
    const userMockIvalid = {
      message: "Invalid email or password",
      code: 401,
      error: true,
      id: false,
    };

    sinon.stub(User, "findOne").resolves(data as User);
    const service = new Userservice();

    const resultOK: IErrorService | IUserCrededential = 
      await service.logIn({ email: data.email, password: passwordValid} as IUserLogin);

    const resultEmailFail: IErrorService | IUserCrededential =
      await service.logIn({ email: "admim@admin", password: data.password } as IUserLogin);

    const resultPasswordLengthFail: IErrorService | IUserCrededential =
      await service.logIn({ email: "admim@admin", password: data.password } as IUserLogin);

    const resultCryptoFail: IErrorService | IUserCrededential =
      await service.logIn({ email: "admim@admin", password: data.password } as IUserLogin);

    expect(resultOK).to.be.deep.equal({ id: 1, email: "admin@admin.com", error: false });
    expect(resultEmailFail).to.be.equal(userMockIvalid);
    expect(resultPasswordLengthFail).to.be.equal(userMockIvalid);
    expect(resultCryptoFail).to.be.equal(userMockIvalid);
  });

  it('Verifica se a service user.getHole() retorna os dados conforme esperado', async function () {
    const data = {
      email: "admin@admin.com",
      password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
      role: "admin",
      username: "Admin",
    };

    sinon.stub(User, "findByPk").resolves(data as User);
    const service = new Userservice();

    const idValid = 1;
    const idInvalid = 3;

    const resultOK = await service.getHole(idValid);
    const resultFail = await service.getHole(idInvalid);
    
    expect(resultOK).to.be.equal('admin');
    expect(resultFail).to.be.equal('null');
  });
});
