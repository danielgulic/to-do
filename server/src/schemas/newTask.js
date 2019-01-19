const Joi = require('joi');

module.exports = Joi.object().keys({
  name: Joi.string().min(1).max(500).required(),
}).required();