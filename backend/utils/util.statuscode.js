class StatusCode {
    statusCodeFromErrorType(error) {
        return error.statusCode ?? 500;
    }
}

module.exports = new StatusCode();
