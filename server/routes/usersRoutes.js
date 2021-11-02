const { register, login, user } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user/:id", user);

module.exports = router;