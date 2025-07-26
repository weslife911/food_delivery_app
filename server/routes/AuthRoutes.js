const { Router } = require("express");
const { registerUser, loginUser, checkAuth } = require("../controllers/AuthController");
const protectedRoute = require("../middleware/AuthMiddleware");

const router = Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/check", protectedRoute, checkAuth);

module.exports = router;