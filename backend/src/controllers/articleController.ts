import type { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

// Lister tous les articles
export async function listArticles(_request: Request, response: Response) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur Supabase lors du listing des articles :', error);
      response.status(500).json({ error: error.message });
      return;
    }

    response.json(data ?? []);
  } catch (err: any) {
    console.error('Erreur serveur lors du listing des articles :', err);
    response.status(500).json({ error: err.message || 'Server error' });
  }
}

// Créer un nouvel article
export async function createArticle(request: Request, response: Response) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  try {
    const body = request.body;

    const title = body.title;
    const content = body.content ?? [body.lead_paragraph || body.subtitle || ''];
    const category = body.category || 'Histoire Royale';
    const cover_image = body.cover_image || body.coverImage || body.image_url || '';
    const lead_paragraph = body.lead_paragraph || body.subtitle || '';
    const author = body.author || { name: 'Admin', role: 'Éditeur', avatar: '' };

    const payload: any = {
      title,
      content,
      category,
      author,
    };

    if (cover_image) {
      payload.cover_image = cover_image;
      payload.coverImage = cover_image;
    }
    if (lead_paragraph) {
      payload.lead_paragraph = lead_paragraph;
    }

    const { data, error } = await supabase
      .from('articles')
      .insert([payload])
      .select();

    if (error) {
      console.error('Erreur Supabase à la création de l\'article :', error);
      response.status(500).json({ error: error.message });
      return;
    }

    response.status(201).json(data ? data[0] : null);
  } catch (err: any) {
    console.error('Erreur serveur lors de la création de l\'article :', err);
    response.status(500).json({ error: err.message || 'Server error' });
  }
}

// Mettre à jour un article
export async function updateArticle(request: Request, response: Response) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  try {
    const { id } = request.params;
    const body = request.body;

    const title = body.title;
    const content = body.content;
    const category = body.category;
    const cover_image = body.cover_image || body.coverImage || body.image_url;
    const lead_paragraph = body.lead_paragraph || body.subtitle;
    const author = body.author;

    const payload: any = {};
    if (title !== undefined) payload.title = title;
    if (content !== undefined) payload.content = content;
    if (category !== undefined) payload.category = category;
    if (cover_image !== undefined) {
      payload.cover_image = cover_image;
      payload.coverImage = cover_image;
    }
    if (lead_paragraph !== undefined) {
      payload.lead_paragraph = lead_paragraph;
    }
    if (author !== undefined) payload.author = author;

    const { data, error } = await supabase
      .from('articles')
      .update(payload)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Erreur Supabase à la mise à jour de l\'article :', error);
      response.status(500).json({ error: error.message });
      return;
    }

    response.json(data ? data[0] : null);
  } catch (err: any) {
    console.error('Erreur serveur lors de la mise à jour de l\'article :', err);
    response.status(500).json({ error: err.message || 'Server error' });
  }
}

// Supprimer un article
export async function deleteArticle(request: Request, response: Response) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  try {
    const { id } = request.params;

    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur Supabase à la suppression de l\'article :', error);
      response.status(500).json({ error: error.message });
      return;
    }

    response.json({ message: 'Article supprimé avec succès' });
  } catch (err: any) {
    console.error('Erreur serveur lors de la suppression de l\'article :', err);
    response.status(500).json({ error: err.message || 'Server error' });
  }
}