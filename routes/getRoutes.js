const express = require("express");
const controller = require("../controllers/controller");

const router = express.Router();

router.get("/week", controller.getDataWeek);
router.get("/month", controller.getDataMonth);
router.get("/threeDayAvg", controller.threeDayAvg);

module.exports = router;
