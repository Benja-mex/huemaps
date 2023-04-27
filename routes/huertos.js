const { Router } = require("express");
const { getHuertos } = require("../controllers/huertos");
const router = Router();

router.get("/",  getHuertos);


module.exports = router