const Joi = require('joi');

module.exports = {
  // POST /v1/number
  create: {
    body: {
      name: Joi.string()
        .max(128)
        .required(),
      number: Joi.string()
        .regex(/^\+[1-9]\d{6,14}$/, { name: 'E.164' }) // E.164 format
        .required(),
      context: Joi.string()
        .min(3)
        .max(16)
        .required()
    }
  },

  // GET /v1/query
  query: {
    query: {
      number: Joi.string()
        .regex(/^\+[1-9]\d{6,14}$/, { name: 'E.164' }) // E.164 format
        .required()
    }
  }
};
