import Joi = require('joi');

const loginParamsValidate = Joi.object().keys({
  name: Joi.string().pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i).required(),
  password: Joi.string().min(6).required(),
});

export default { loginParamsValidate };
