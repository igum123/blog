class NotAcceptable {
    constructor(message) {
        this.message = message;
        if (!this.message) {
            this.message = 'Not acceptable';
        }
        this.error = true;
        this.code = 406;
    }
}
module.exports = NotAcceptable;