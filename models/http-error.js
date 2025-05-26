class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // Add a message to the built-in Error
    this.code = errorCode; // Custom property for HTTP status code

    // Maintains proper stack trace (only in V8 engines like Node.js)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = this.constructor.name; // Optional: Name the error class
  }
}

module.exports = HttpError;
