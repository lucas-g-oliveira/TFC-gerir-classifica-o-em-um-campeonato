import Joi = require('joi');

const loginParamsValidate = Joi.object().keys({
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2})?$/).required(),
  password: Joi.string().min(6).required(),
});

export default { loginParamsValidate };
