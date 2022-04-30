const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

//register user
router.post("/register", userController.registerUser);

//login user
router.post("/login", userController.loginUser);

//verify user
router.get("/verify", userController.verifiedToken);

module.exports = router;
