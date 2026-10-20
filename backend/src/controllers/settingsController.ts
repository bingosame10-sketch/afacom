import type { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

export const getBannerImages = async (_req: Request, res: Response) => {
  if (!supabase) {
    res.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('banner_images')
      .eq('id', 'banner')
      .maybeSingle();

    if (error) throw error;
    res.status(200).json(data ? data.banner_images : []);
  } catch (error: any) {
    console.error('Erreur getBannerImages:', error);
    res.status(500).json({ error: error.message });
  }
};

export const updateBannerImages = async (req: Request, res: Response) => {
  if (!supabase) {
    res.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  try {
    const { bannerImages } = req.body;
    const { data, error } = await supabase
      .from('site_settings')
      .upsert({ id: 'banner', banner_images: bannerImages, updated_at: new Date().toISOString() })
      .select();

    if (error) throw error;
    res.status(200).json(data && data[0] ? data[0].banner_images : []);
  } catch (error: any) {
    console.error('Erreur updateBannerImages:', error);
    res.status(500).json({ error: error.message });
  }
};

export async function uploadBannerImage(request: Request, response: Response) {
  if (!supabase) {
    response.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  try {
    const file = (request as any).file;
    if (!file) {
      response.status(400).json({ error: 'Aucun fichier fourni' });
      return;
    }

    const fileExt = file.originalname.split('.').pop();
    const fileName = `banner-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload vers le bucket Supabase Storage (nommé 'media')
    const { error: uploadError } = await supabase.storage
      .from('media') 
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (uploadError) {
      console.error('Erreur Storage Supabase:', uploadError);
      response.status(500).json({ error: uploadError.message });
      return;
    }

    // Récupération de l'URL publique de l'image
    const { data: publicUrlData } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    const imageUrl = publicUrlData.publicUrl;

    response.status(200).json({ url: imageUrl });
  } catch (err: any) {
    console.error('Erreur serveur uploadBannerImage:', err);
    response.status(500).json({ error: err.message || 'Server error' });
  }
}