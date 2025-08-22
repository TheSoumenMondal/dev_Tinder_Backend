export class BaseError extends Error {
    constructor(message, statusCode, name) {
        super(message);
        this.name = name || new.target.name;
        this.statusCode = statusCode;
    }
}
