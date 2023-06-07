class NotAllow {
    constructor(message) {
        this.message = message;
        if (!this.message) {
            this.message = 'Not allow';
        }
        this.error = true;
        this.code = 405;
    }
}
module.exports = NotAllow;