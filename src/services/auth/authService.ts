import { injectable, inject } from "inversify";
import { LoginResponse, LoginStrategy } from "./strategies";

@injectable()
export default class AuthService {
  private loginStrategy: LoginStrategy;

  constructor(@inject("LoginStrategy") loginStrategy: LoginStrategy) {
    this.loginStrategy = loginStrategy;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    return this.loginStrategy.login(email, password);
  }
}