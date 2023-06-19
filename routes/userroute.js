import express from "express";
import {register, login, getme} from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post('/signup', register)
router.post('/login', login)
router.get('/me', protect, getme)

export default router;