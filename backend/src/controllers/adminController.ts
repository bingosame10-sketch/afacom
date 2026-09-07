import type { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

export async function loginAdmin(request: Request, response: Response) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  const { email, password } = request.body as { email?: string; password?: string };
  if (!email || !password) {
    response.status(400).json({ error: 'Email and password are required' });
    return;
  }

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
  if (authError || !authData.session || !authData.user.email) {
    response.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const { data: admin, error: adminError } = await supabase
    .from('admin_users')
    .select('email')
    .eq('email', authData.user.email)
    .maybeSingle();

  if (adminError || !admin) {
    await supabase.auth.signOut();
    response.status(403).json({ error: 'This email is not an administrator' });
    return;
  }

  response.json({
    accessToken: authData.session.access_token,
    email: authData.user.email,
  });
}
