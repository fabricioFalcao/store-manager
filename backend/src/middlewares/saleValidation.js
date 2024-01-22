const mapFieldValidation = require('../utils/mapFieldValidation');
const { saleItemSchema } = require('./validations/schemas');

const validateNewSale = (req, res, next) => {
  const saleData = req.body;
  
  for (let i = 0; i < saleData.length; i += 1) {
    const { error } = saleItemSchema.validate(saleData[i]);
    if (error) return res.status(mapFieldValidation(error)).json({ message: error.message });
  }
  next();
};

module.exports = {
  validateNewSale,
};