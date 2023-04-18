import express from "express";
import { loginController } from "../../controllers/loginController";
import AuthService from "../../services/auth/authService";
import { loginValidationRules, validateInput } from "../../middlewares";

export const authRouter = (authService: AuthService) => {
  const router = express.Router();

  router.post("/login", loginValidationRules(), validateInput, loginController(authService));
  return router;
};