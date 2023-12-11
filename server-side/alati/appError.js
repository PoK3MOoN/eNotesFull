class AppError extends Error {
  constructor(message, statusKod) {
    super(message);

    this.statusKod = statusKod;
    this.status = `${statusKod}`.startsWith("4") ? "fail" : "error";
    this.jelOperativan = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
