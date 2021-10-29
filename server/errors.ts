abstract class HttpError extends Error {
  abstract statusCode: number
}

export class UnauthorizedError extends HttpError {
  statusCode = 401
  message = "Authentication is required"
}
