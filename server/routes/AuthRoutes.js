const { Router } = require("express");
const { registerUser, loginUser, checkAuth, verifyEmail } = require("../controllers/AuthController");
const protectedRoute = require("../middleware/AuthMiddleware");

const router = Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/check", protectedRoute, checkAuth);
router.post("/auth/verify", verifyEmail);

module.exports = router;