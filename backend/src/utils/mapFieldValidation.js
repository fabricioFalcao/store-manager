const mapStatusHTTP = require('./mapStatusHTTP');

const mapFieldValidation = (error) => {
  if (error.details[0].type === 'any.required') {
    return mapStatusHTTP('BAD_REQUEST');
  }
  return mapStatusHTTP('INVALID_VALUE');
};

module.exports = mapFieldValidation;