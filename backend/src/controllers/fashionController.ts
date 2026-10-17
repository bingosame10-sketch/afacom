import type { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

export async function listFashionItems(_request: Request, response: Response) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  try {
    const { data, error } = await supabase
      .from('fashion_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur Supabase listFashionItems:', error);
      response.status(500).json({ error: error.message });
      return;
    }

    response.json(data ?? []);
  } catch (err: any) {
    console.error('Erreur serveur listFashionItems:', err);
    response.status(500).json({ error: err.message || 'Server error' });
  }
}

export async function createFashionItem(request: Request, response: Response) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  try {
    const { title, description, image_url, category, designer } = request.body;

    const { data, error } = await supabase
      .from('fashion_items')
      .insert([
        {
          title,
          description,
          image_url,
          category,
          ...(designer && { designer }),
        },
      ])
      .select();

    if (error) {
      console.error('Erreur Supabase createFashionItem:', error);
      response.status(500).json({ error: error.message });
      return;
    }

    response.status(201).json(data ? data[0] : null);
  } catch (err: any) {
    console.error('Erreur serveur createFashionItem:', err);
    response.status(500).json({ error: err.message || 'Server error' });
  }
}

export async function updateFashionItem(request: Request, response: Response) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  try {
    const { id } = request.params;
    const { title, description, image_url, category, designer } = request.body;

    const { data, error } = await supabase
      .from('fashion_items')
      .update({
        title,
        description,
        image_url,
        category,
        ...(designer && { designer }),
      })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Erreur Supabase updateFashionItem:', error);
      response.status(500).json({ error: error.message });
      return;
    }

    response.json(data ? data[0] : null);
  } catch (err: any) {
    console.error('Erreur serveur updateFashionItem:', err);
    response.status(500).json({ error: err.message || 'Server error' });
  }
}

export async function deleteFashionItem(request: Request, response: Response) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  try {
    const { id } = request.params;

    const { error } = await supabase
      .from('fashion_items')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur Supabase deleteFashionItem:', error);
      response.status(500).json({ error: error.message });
      return;
    }

    response.json({ message: 'Élément Mode supprimé avec succès' });
  } catch (err: any) {
    console.error('Erreur serveur deleteFashionItem:', err);
    response.status(500).json({ error: err.message || 'Server error' });
  }
}