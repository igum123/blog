class Timeout {
    constructor(message) {
        this.message = message;
        if (!this.message) {
            this.message = 'Timeout';
        }
        this.error = true;
        this.code = 408;
    }
}
module.exports = Timeout;