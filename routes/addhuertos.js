const { Router } = require("express");
const { getHuertos, postHuertos } = require("../controllers/addhuertos");
const router = Router();

router.get("/",  getHuertos);
router.post("/",  postHuertos);


module.exports = router