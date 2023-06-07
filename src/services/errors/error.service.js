const DefaultError = require('./models/Error');

class Error {
    constructor(error) {
        const now = new Date();
        console.error(`${now.getFullYear()}/${now.getMonth()}/${now.getDate()}  ${now.getHours()}:${now.getMinutes()}`, error);
        if (!error || !error.code || !error.error) {
            let message = '';
            if (error) message = error.message;
            this.error = new DefaultError(message);
        } else {
            this.error = error;
        }
    }
    send(res) {
        res.status(this.error.code).send(this.error);
    }

}

module.exports = Error;