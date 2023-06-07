class Forbidden {
    constructor(message) {
        this.message = message;
        if (!this.message) {
            this.message = 'Forbidden';
        }
        this.error = true;
        this.code = 403;
    }
}
module.exports = Forbidden;