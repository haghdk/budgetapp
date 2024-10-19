class TokenGenerationError extends Error {
    constructor(message) {
        super(message);
        this.name = "TokenGenerationError";
        this.statusCode = 500;
    }
}

module.exports = TokenGenerationError;
