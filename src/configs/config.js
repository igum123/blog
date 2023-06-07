const Config = new (function () {
    this.port = process.env.PORT;
    this.name = process.env.APP_NAME;
    this.cookiesName = 'AEvneje35eVz7v';

    this.database = {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        table: process.env.DATABASE_TABLE
    };
    this.stripe = {
        secretKey: process.env.STRIPE_SECRET_KEY,
        publicKey: process.env.STRIPE_PUBLIC_KEY
    };
    this.slack = {
        token: process.env.SLACK_TOKEN
    };
    if (!process.env.DATABASE_HOST) {
        this.database = {
            host: 'localhost',
            user: 'root',
            password: "admin",
            table: "marco"
        };
    }
    this.dev = (process.env.DEV);
    this.test = (process.env.TEST);

    this.jwtToken = process.env.TOKEN_KEY;



    this.google = {
        sheet: {
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            privateKey: process.env.GOOGLE_PRIVATE_KEY,
        }
    }
    this.sendinblue = {
        email: process.env.SENDINBLUE_EMAIL,
        token: process.env.SENDINBLUE_TOKEN,
        name: process.env.SENDINBLUE_NAME
    }
})();

module.exports = Config;