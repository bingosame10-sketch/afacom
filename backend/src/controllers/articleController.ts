import type { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

// Lister tous les articles
export async function listArticles(_request: Request, response: Response) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    response.status(500).json({ error: error.message });
    return;
  }

  response.json(data ?? []);
}

// Créer un nouvel article
export async function createArticle(request: Request, response: Response) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  const { data, error } = await supabase
    .from('articles')
    .insert([request.body])
    .select();

  if (error) {
    response.status(500).json({ error: error.message });
    return;
  }

  response.status(201).json(data ? data[0] : null);
}

// Mettre à jour un article
export async function updateArticle(request: Request, response: Response) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  const { id } = request.params;
  const { data, error } = await supabase
    .from('articles')
    .update(request.body)
    .eq('id', id)
    .select();

  if (error) {
    response.status(500).json({ error: error.message });
    return;
  }

  response.json(data ? data[0] : null);
}

// Supprimer un article
export async function deleteArticle(request: Request, response: Response) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  const { id } = request.params;
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id);

  if (error) {
    response.status(500).json({ error: error.message });
    return;
  }

  response.json({ message: 'Article supprimé avec succès' });
}