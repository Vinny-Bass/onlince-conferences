import { Request, Response, NextFunction } from "express";
import AuthService from "../services/auth/authService";

export const loginController = (authService: AuthService) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const response = await authService.login(email, password);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };
};