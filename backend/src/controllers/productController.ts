import type { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

export async function listProducts(_request: Request, response: Response) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur Supabase listProducts:', error);
      response.status(500).json({ error: error.message });
      return;
    }

    response.json(data ?? []);
  } catch (err: any) {
    console.error('Erreur serveur listProducts:', err);
    response.status(500).json({ error: err.message || 'Server error' });
  }
}

export async function createProduct(request: Request, response: Response) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  try {
    const { name, description, price, image_url, category, in_stock } = request.body;

    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name,
          description,
          price: price !== undefined ? Number(price) : 0,
          image_url,
          category,
          ...(in_stock !== undefined && { in_stock }),
        },
      ])
      .select();

    if (error) {
      console.error('Erreur Supabase createProduct:', error);
      response.status(500).json({ error: error.message });
      return;
    }

    response.status(201).json(data ? data[0] : null);
  } catch (err: any) {
    console.error('Erreur serveur createProduct:', err);
    response.status(500).json({ error: err.message || 'Server error' });
  }
}

export async function updateProduct(request: Request, response: Response) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  try {
    const { id } = request.params;
    const { name, description, price, image_url, category, in_stock } = request.body;

    const { data, error } = await supabase
      .from('products')
      .update({
        name,
        description,
        price: price !== undefined ? Number(price) : 0,
        image_url,
        category,
        ...(in_stock !== undefined && { in_stock }),
      })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Erreur Supabase updateProduct:', error);
      response.status(500).json({ error: error.message });
      return;
    }

    response.json(data ? data[0] : null);
  } catch (err: any) {
    console.error('Erreur serveur updateProduct:', err);
    response.status(500).json({ error: err.message || 'Server error' });
  }
}

export async function deleteProduct(request: Request, response: Response) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  try {
    const { id } = request.params;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur Supabase deleteProduct:', error);
      response.status(500).json({ error: error.message });
      return;
    }

    response.json({ message: 'Produit supprimé avec succès' });
  } catch (err: any) {
    console.error('Erreur serveur deleteProduct:', err);
    response.status(500).json({ error: err.message || 'Server error' });
  }
}