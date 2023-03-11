import * as Joi from 'joi';

const loginParamsValidate = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const addMatch = Joi.object().keys({
  homeTeamId: Joi.number().min(0).required(),
  awayTeamId: Joi.number().min(0).required(),
  homeTeamGoals: Joi.number().min(0).required(),
  awayTeamGoals: Joi.number().min(0).required(),
  currentUserId: Joi.number().min(0).required(),
});

export default { loginParamsValidate, addMatch };
