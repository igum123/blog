class BadRequest {
    constructor(message) {
        this.message = message;
        if (!this.message) {
            this.message = 'Bad request';
        }
        this.error = true;
        this.code = 400;
    }
}
module.exports = BadRequest;