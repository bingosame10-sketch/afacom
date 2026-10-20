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

    // Normalisation des champs pour correspondre aux 16 colonnes exactes de Supabase
    const title = body.title;
    const subtitle = body.subtitle ?? body.lead_paragraph ?? body.summary ?? '';
    const category = body.category ?? 'Histoire Royale';
    const read_time = body.read_time ?? body.readTime ?? '';
    
    // author est jsonb et non null
    const author = body.author && typeof body.author === 'object'
      ? body.author
      : { name: 'AFACOM', role: 'Rédaction', avatar: '' };

    const publish_date = body.publish_date ?? body.publishDate ?? null;
    const cover_image = body.cover_image ?? body.coverImage ?? body.image_url ?? '';
    const lead_paragraph = body.lead_paragraph ?? body.summary ?? body.subtitle ?? '';

    // Formate les champs text[] en tableaux
    const content = Array.isArray(body.content)
      ? body.content
      : [body.content || body.lead_paragraph || ''];

    const historical_highlights = Array.isArray(body.historical_highlights)
      ? body.historical_highlights
      : Array.isArray(body.historicalHighlights)
      ? body.historicalHighlights
      : [];

    const historical_era = body.historical_era ?? body.historicalEra ?? '';
    const region = body.region ?? '';
    const related_fabric = body.related_fabric ?? body.relatedFabric ?? '';

    const tags = Array.isArray(body.tags) ? body.tags : [];

    const payload: any = {
      title,
      subtitle,
      category,
      read_time,
      author,
      cover_image,
      lead_paragraph,
      content,
      historical_highlights,
      historical_era,
      region,
      related_fabric,
      tags,
    };

    if (publish_date) {
      payload.publish_date = publish_date;
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

    const payload: any = {};

    if (body.title !== undefined) payload.title = body.title;
    if (body.subtitle !== undefined) payload.subtitle = body.subtitle;
    if (body.category !== undefined) payload.category = body.category;
    if (body.read_time !== undefined || body.readTime !== undefined) {
      payload.read_time = body.read_time ?? body.readTime;
    }
    if (body.author !== undefined) payload.author = body.author;
    if (body.publish_date !== undefined || body.publishDate !== undefined) {
      payload.publish_date = body.publish_date ?? body.publishDate;
    }
    if (body.cover_image !== undefined || body.coverImage !== undefined || body.image_url !== undefined) {
      payload.cover_image = body.cover_image ?? body.coverImage ?? body.image_url;
    }
    if (body.lead_paragraph !== undefined || body.summary !== undefined) {
      payload.lead_paragraph = body.lead_paragraph ?? body.summary;
    }
    if (body.content !== undefined) {
      payload.content = Array.isArray(body.content) ? body.content : [body.content];
    }
    if (body.historical_highlights !== undefined || body.historicalHighlights !== undefined) {
      const hh = body.historical_highlights ?? body.historicalHighlights;
      payload.historical_highlights = Array.isArray(hh) ? hh : [];
    }
    if (body.historical_era !== undefined || body.historicalEra !== undefined) {
      payload.historical_era = body.historical_era ?? body.historicalEra;
    }
    if (body.region !== undefined) payload.region = body.region;
    if (body.related_fabric !== undefined || body.relatedFabric !== undefined) {
      payload.related_fabric = body.related_fabric ?? body.relatedFabric;
    }
    if (body.tags !== undefined) {
      payload.tags = Array.isArray(body.tags) ? body.tags : [];
    }

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