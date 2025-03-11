class CustomAPIError extends Error {
  constructor(public message: string, public statusCode?: number) {
    super(message);
    this.statusCode = statusCode || 500;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default CustomAPIError;
