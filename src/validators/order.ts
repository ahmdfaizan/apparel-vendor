import Joi from "joi";

export const orderItem = Joi.object().keys({
  code: Joi.string().required(),
  size: Joi.string().required(),
  quantity: Joi.number().integer().min(1).max(1000).required(),
});

export const order = Joi.array().items(orderItem).min(1);
