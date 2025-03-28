export function ErrorInputsHandler(zodError) {
    const details = zodError.issues.map((issue) => ({ message: issue.message, path: issue.path }));
    return {
        error: "Validation Error",
        details: details
    };
}
export function ServerErrorHandler({ error, res }) {
    console.log(error);
    return res.status(500).json({ error: "A server error ocurred, try again later" });
}
