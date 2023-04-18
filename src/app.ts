import "reflect-metadata";
import * as dotenv from 'dotenv';
dotenv.config();

import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import { authRouter } from "./routes/auth/authRouter"
import authContainer from "./containers/authContainer";
import AuthService from "./services/auth/authService";
import { errorHandler, notFoundHandler } from "./middlewares";


export class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(cors());
  }

  private configureRoutes(): void {
    const authService = authContainer.resolve<AuthService>(AuthService);
    this.app.use("/auth", authRouter(authService));
  }

  private configureErrorHandling(): void {
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  public async start(port: number): Promise<void> {
    try {
      this.app.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
      });
    } catch (error) {
      console.error(error);
    }
  }
}

const app = new App();

export default app;