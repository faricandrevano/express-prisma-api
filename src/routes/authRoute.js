import express from "express";
import * as AuthController from '../controllers/AuthController.js';
import * as AuhtValidation from '../validation/index.js';
import validation from "../middleware/Validate.js";
import authencticateToken from '../middleware/Auth.js';
const router = express.Router();

router.post('/register',AuhtValidation.registerValidation,validation,AuthController.register);
router.post('/login', AuhtValidation.loginValidation,validation,AuthController.login);
router.get('/logout',authencticateToken,AuthController.logout);

export default router;