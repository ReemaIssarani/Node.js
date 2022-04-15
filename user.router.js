const express = require('express')
const { createUser } = require('./user.controller')
const { validateUser } = require('./user.controller')
const { loginUser } = require('./user.controller')
const router = require("express").Router();

router.post("/",createUser);
router.post("/login",validateUser);
router.post("/loginagain",loginUser);

module.exports = router;