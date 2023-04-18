import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
import { Container } from "inversify";
import { LoginResponse, LoginStrategy } from "../../src/services/auth/strategies";
import AuthService from "../../src/services/auth/authService";
import { loginController } from "../../src/controllers/loginController";

describe("loginController", () => {
  let authServiceMock: AuthService;
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    const container = new Container();

    const loginStrategyMock: LoginStrategy = {
      login: jest.fn(),
    };

    container.bind<LoginStrategy>("LoginStrategy").toConstantValue(loginStrategyMock);
    authServiceMock = new AuthService(container.get<LoginStrategy>("LoginStrategy"));

    req = {} as Request;
    res = {
      json: jest.fn(),
    } as unknown as Response;
    next = jest.fn();
  });

  it("should return a token when given valid credentials", async () => {
    const token = "mock_token";
    authServiceMock.login = jest.fn().mockResolvedValue({ token });

    req.body = {
      email: "test@example.com",
      password: "password123",
    };

    await loginController(authServiceMock)(req, res, next);
    expect(res.json).toHaveBeenCalledWith({ token });
  });

  // it("should call the next middleware with an error when given invalid credentials", async () => {
  //   // Set up the mock LoginStrategy implementation to return false
  //   authServiceMock.login = jest.fn().mockResolvedValue({ token: false });

  //   // Set up the request body with invalid credentials
  //   req.body = {
  //     email: "test@example.com",
  //     password: "wrong_password",
  //   };

  //   // Call the login controller function
  //   await loginController(authServiceMock)(req, res, next);

  //   // Assert that the next middleware was called with an error
  //   expect(next).toHaveBeenCalledWith(expect.any(Error));
  // });
});
