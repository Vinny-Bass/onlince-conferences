import { SupabaseClient, createClient, AuthResponse } from '@supabase/supabase-js';
import handlError from '../../lib/errorHandler';

export type LoginResponse = {
  valid: boolean,
  token: string
}

export interface LoginStrategy {
  login(email: string, password: string): Promise<LoginResponse>;
}

export class SupabaseLoginStrategy implements LoginStrategy {
  private supabase: SupabaseClient;

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const { error, data } = await this.supabase.auth.signInWithPassword({ email, password });

    if (error) {
      handlError(error.message, error.status);
    }

    return {
      valid: true,
      token: data.session.access_token
    };
  }
}