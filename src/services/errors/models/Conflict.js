class Conflict {
    constructor(message) {
        this.message = message;
        if (!this.message) {
            this.message = 'Conflict';
        }
        this.error = true;
        this.code = 409;
    }
}
module.exports = Conflict;