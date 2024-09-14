class StatusCode {
    /**
     * Return statuscode based on error type and return 500 if no code if found
     * @param {*} error
     * @returns Integer
     */
    statusCodeFromErrorType(error) {
        return error.statusCode ?? 500;
    }
}

module.exports = new StatusCode();
