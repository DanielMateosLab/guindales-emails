abstract class HttpError extends Error {
  abstract statusCode: number
}

export class UnauthorizedError extends HttpError {
  statusCode = 401
  message = "Insuficient permissions to complete the action"
}
