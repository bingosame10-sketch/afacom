import type { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

export async function listForumPosts(_request: Request, response: Response) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  try {
    const { data, error } = await supabase
      .from('forum_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur Supabase listForumPosts:', error);
      response.status(500).json({ error: error.message });
      return;
    }

    response.json(data ?? []);
  } catch (err: any) {
    console.error('Erreur serveur listForumPosts:', err);
    response.status(500).json({ error: err.message || 'Server error' });
  }
}

export async function createForumPost(request: Request, response: Response) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  try {
    const { title, content, author, category } = request.body;

    const { data, error } = await supabase
      .from('forum_posts')
      .insert([
        {
          title,
          content,
          author,
          category,
        },
      ])
      .select();

    if (error) {
      console.error('Erreur Supabase createForumPost:', error);
      response.status(500).json({ error: error.message });
      return;
    }

    response.status(201).json(data ? data[0] : null);
  } catch (err: any) {
    console.error('Erreur serveur createForumPost:', err);
    response.status(500).json({ error: err.message || 'Server error' });
  }
}

export async function deleteForumPost(request: Request, response: Response) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  try {
    const { id } = request.params;

    const { error } = await supabase
      .from('forum_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur Supabase deleteForumPost:', error);
      response.status(500).json({ error: error.message });
      return;
    }

    response.json({ message: 'Post du forum supprimé avec succès' });
  } catch (err: any) {
    console.error('Erreur serveur deleteForumPost:', err);
    response.status(500).json({ error: err.message || 'Server error' });
  }
}