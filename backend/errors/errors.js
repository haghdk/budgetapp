const NotFoundError = require("../errors/error.notfound");
const BadRequestError = require("../errors/error.badrequest");
const ConflictError = require("../errors/error.conflict");
const UnauthorizedError = require("../errors/error.unathorized");

module.exports = { NotFoundError, BadRequestError, ConflictError, UnauthorizedError };
