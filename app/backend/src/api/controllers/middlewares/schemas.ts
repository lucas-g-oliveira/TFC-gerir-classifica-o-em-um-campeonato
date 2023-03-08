import Joi = require('joi');

const loginParamsValidate = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export default { loginParamsValidate };
