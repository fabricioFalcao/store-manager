const mapFieldValidation = require('../utils/mapFieldValidation');
const { saleItemSchema, updateSaleSchema } = require('./validations/schemas');

const validateNewSale = (req, res, next) => {
  const saleData = req.body;
  
  for (let i = 0; i < saleData.length; i += 1) {
    const { error } = saleItemSchema.validate(saleData[i]);
    if (error) return res.status(mapFieldValidation(error)).json({ message: error.message });
  }
  next();
};

const validateUpdateSale = (req, res, next) => {
  const quantity = req.body;

  const { error } = updateSaleSchema.validate(quantity);
  if (error) return res.status(mapFieldValidation(error)).json({ message: error.message });

  next();
};

module.exports = {
  validateNewSale,
  validateUpdateSale,
};