import Joi from "joi";

export const apparel = Joi.object().keys({
  code: Joi.string().required(),
  size: Joi.string().required(),
  stock: Joi.number().integer().min(0),
  price: Joi.number().min(1),
});

export const apparels = Joi.array().items(apparel);
