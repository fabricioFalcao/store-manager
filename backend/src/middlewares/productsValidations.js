const mapFieldValidation = require('../utils/mapFieldValidation');
const { productSchema } = require('./validations/schemas');

const validateProduct = (req, res, next) => {
  const productData = req.body;

  const { error } = productSchema.validate(productData);
  if (error) return res.status(mapFieldValidation(error)).json({ message: error.message });
  
  next();
};

module.exports = {
  validateProduct,
};