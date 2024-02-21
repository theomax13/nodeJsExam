import { Router } from "express";
import * as authController from "../controllers/authController";
import * as usersController from "../controllers/usersController";

const router = Router();

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.post("/refresh", authController.refresh);

export default router;
