const mapStatusHTTP = require('../utils/mapStatusHTTP');
const { productSchema } = require('./validations/schemas');

const validateNewProduct = (req, res, next) => {
  const productData = req.body;

  const { error } = productSchema.validate(productData);
  if (error && error.details[0].type === 'any.required') {
    return res.status(mapStatusHTTP('BAD_REQUEST')).json({ message: error.message });
  }
  if (error) return res.status(mapStatusHTTP('INVALID_VALUE')).json({ message: error.message });

  next();
};

module.exports = {
  validateNewProduct,
};