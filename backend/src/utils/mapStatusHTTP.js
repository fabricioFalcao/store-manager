const httpErrorMap = {
  SUCCESSFUL: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_VALUE: 422,
  SERVER_ERROR: 500,
};

const mapStatusHTTP = (status) => httpErrorMap[status] || 500;

module.exports = mapStatusHTTP;