import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { body } from "express-validator";

export interface AppError {
  status: number;
  message: string;
}

export const errorHandler = (error: AppError, req: Request, res: Response, next: NextFunction): void => {
  const status = error.status || 500;
  const message = error.message || "Internal server error";

  res.status(status).json({ message });
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error: AppError = {
    status: 404,
    message: "Not found",
  };

  next(error);
};

export const loginValidationRules = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Email must be valid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];
};

export const validateInput = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};