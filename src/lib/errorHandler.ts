import { AppError } from "../middlewares";

export default function handlError(message: string, status: number): void {
  const error: AppError = {
    status,
    message
  };

  throw error;
}