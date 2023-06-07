class PaymentRequired {
    constructor(message) {
        this.message = message;
        if (!this.message) {
            this.message = 'Payment require';
        }
        this.error = true;
        this.code = 402;
    }
}
module.exports = PaymentRequired;