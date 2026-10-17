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
    // Extraction explicite des champs pour éviter d'envoyer des propriétés inconnues du formulaire
    const { title, content, category, image_url, summary, author } = request.body;

    const { data, error } = await supabase
      .from('articles')
      .insert([
        {
          title,
          content,
          category,
          image_url,
          summary,
          ...(author && { author }),
        },
      ])
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
    const { title, content, category, image_url, summary, author } = request.body;

    const { data, error } = await supabase
      .from('articles')
      .update({
        title,
        content,
        category,
        image_url,
        summary,
        ...(author && { author }),
      })
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