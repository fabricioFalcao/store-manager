const joi = require('joi');

const productSchema = joi.object({
  name: joi.string().min(5).required(),
});

const saleItemSchema = joi.object({
  productId: joi.number().integer().required(),
  quantity: joi.number().integer().min(1).required(),
});

module.exports = {
  productSchema,
  saleItemSchema,
};