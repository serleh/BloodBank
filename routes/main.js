const router = require("express").Router();
const homeController = require("../controller/home");
const authController = require("../controller/auth");

router.get("/", homeController.getIndex);
router.get("/register", authController.getRegister);
router.post("/register", authController.register);

module.exports = router;
