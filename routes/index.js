const express = require("express");
const router = express.Router();
var path = require('path');

// Controller
const {
    register,
    login,
    logout
} = require("../controllers/index.controller");



router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;