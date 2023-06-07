class Error {
    constructor(message) {
        this.message = message;
        if (!this.message) {
            this.message = 'An error occured, please try later';
        }
        this.error = true;
        this.code = 500;
    }
}
module.exports = Error;