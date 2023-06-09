const express = require('express');
const router = express.Router();

const SubscribeNewsletters = require('./routes/subscribeNewsletters');

router.post("/api/v1/newsletters", async (req, res) => {
    const route = new SubscribeNewsletters(req, res);
    route.process();
});

module.exports = router;