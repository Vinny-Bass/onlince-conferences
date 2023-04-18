import { Container } from "inversify";
import AuthService from "../services/auth/authService";
import { SupabaseLoginStrategy } from "../services/auth/strategies";

const container = new Container();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
container.bind<AuthService>(AuthService).toSelf();
container.bind<SupabaseLoginStrategy>("LoginStrategy").toConstantValue(new SupabaseLoginStrategy(supabaseUrl, supabaseKey));

export default container;