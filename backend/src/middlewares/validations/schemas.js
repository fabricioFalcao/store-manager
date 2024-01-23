const joi = require('joi');

const productSchema = joi.object({
  name: joi.string().min(5).required(),
});

const quantitySchema = joi.number().integer().min(1).required();

const updateSaleSchema = joi.object({
  quantity: quantitySchema,
});

const saleItemSchema = joi.object({
  productId: joi.number().integer().required(),
  quantity: quantitySchema,
});

module.exports = {
  productSchema,
  saleItemSchema,
  updateSaleSchema,
};