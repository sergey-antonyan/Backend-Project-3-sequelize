const Joi = require('joi');


exports.regSchema = Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-z0-9]{3,30}$')).required(),
})

exports.logSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-z0-9]{3,30}$')).required(),
})