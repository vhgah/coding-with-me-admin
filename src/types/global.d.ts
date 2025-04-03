declare global {
  interface PlatformError {
    code: string
    message: string
    details: ErrorDetails
  }

  interface ErrorDetails {
    message: string,
    errors: [],
  }
}

export {}