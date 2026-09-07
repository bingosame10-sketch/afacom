import type { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

export async function listProducts(_request: Request, response: Response) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    response.status(500).json({ error: error.message });
    return;
  }

  response.json(data ?? []);
}
