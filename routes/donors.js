const router = require("express").Router();
const donorsController = require("../controller/donors");
const { isLoggedIn } = require("../middleware/isLoggedIn");

router.get("/profile", isLoggedIn, donorsController.getProfile);
router.get("/profile/edit", isLoggedIn, donorsController.getUpdateProfile);
router.post("/profile/edit", isLoggedIn, donorsController.updateProfile);

module.exports = router;
