abstract class HttpError extends Error {
  abstract statusCode: number
}

export class UnauthorizedError extends HttpError {
  statusCode = 401
  message = "Insufficient permissions to complete the action."
}

export class InvalidIdError extends HttpError {
  statusCode = 400
  message = "The _id provided is not valid."
}
