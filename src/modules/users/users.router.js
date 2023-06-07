const express = require('express');
const router = express.Router();

const GetUser = require('./routes/getUser');
const Login = require('./routes/login');

router.get("/api/v1/user", async (req, res) => {
    const route = new GetUser(req, res);
    route.process();
});

router.post("/api/v1/login", async (req, res) => {
    const route = new Login(req, res);
    route.process();
});

module.exports = router;