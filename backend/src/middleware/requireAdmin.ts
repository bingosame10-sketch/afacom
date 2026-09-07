import type { NextFunction, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

export async function requireAdmin(request: Request, response: Response, next: NextFunction) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  const authorization = request.header('authorization');
  const token = authorization?.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length)
    : null;

  if (!token) {
    response.status(401).json({ error: 'Authentication required' });
    return;
  }

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  const email = userData.user?.email;

  if (userError || !email) {
    response.status(401).json({ error: 'Invalid authentication token' });
    return;
  }

  const { data: admin, error: adminError } = await supabase
    .from('admin_users')
    .select('email')
    .eq('email', email)
    .maybeSingle();

  if (adminError || !admin) {
    response.status(403).json({ error: 'Administrator access required' });
    return;
  }

  next();
}
