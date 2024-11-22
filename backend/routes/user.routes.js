import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const router = Router();

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/logout', verifyToken, UserController.logout)

export default router;