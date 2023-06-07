class NotFound {
    constructor(message) {
        this.message = message;
        if (!this.message) {
            this.message = 'Not found';
        }
        this.error = true;
        this.code = 404;
    }
}
module.exports = NotFound;