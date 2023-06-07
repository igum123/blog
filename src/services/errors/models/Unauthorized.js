class Unauthorized {
    constructor(message) {
        this.message = message;
        if (!this.message) {
            this.message = 'Unauthorized';
        }
        this.error = true;
        this.code = 401;
    }
}
module.exports = Unauthorized;