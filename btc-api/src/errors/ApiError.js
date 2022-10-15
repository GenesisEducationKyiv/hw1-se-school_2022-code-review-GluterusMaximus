export default class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static badRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static notFound(message = 'Not Found', errors = []) {
    return new ApiError(404, message, errors);
  }

  static conflict(message = 'There is a conflict', errors = []) {
    return new ApiError(409, message, errors);
  }

  static internal(message = 'Internal server error', errors = []) {
    return new ApiError(500, message, errors);
  }
}
