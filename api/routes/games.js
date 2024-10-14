const express = require("express");
const router = express.Router();

const game = require("../controllers/games");


router.post("/", game.create);

module.exports = router