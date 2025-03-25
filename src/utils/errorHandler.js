export function ErrorInputsHandler(zodError) {
  const details = zodError.issues.map((issue) => ({message: issue.message, path: issue.path}))
  return {
    error: "Validation Error",
    details: details
  }
}